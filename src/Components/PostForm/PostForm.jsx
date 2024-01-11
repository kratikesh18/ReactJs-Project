import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import dbService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        subPara: post?.subPara || "lorem",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;

      if (file) {
        dbService.deleteFile(post.featuredimg);
      }

      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredimg: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await dbService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredimg = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
          author: userData.name,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:flex-row p-4 flex-wrap 
    items-center bg-slate-200/50 w-[95%] mx-auto"
    >
      <div className="w-full md:w-2/3 px-2">
        <div className=" flex flex-col gap-4 py-4 ">
          <Input
            label="Title :"
            placeholder=" Post Title"
            className=" flex justify-between gap-[2em] md:w-[70%]"
            {...register("title", { required: true })}
          />
          <Input
            label="Desc :"
            placeholder="Tagline"
            className=" flex justify-between gap-[2em] md:w-[70%]"
            {...register("subPara", { required: true })}
          />

          <Input
            value={userData.name}
            label="Author:"
            placeholder="author: "
            className=" flex justify-between gap-[2em] md:w-[70%]"
            readOnly={true}
            {...register("author", { required: true })}
          />

          <Input
            label="Slug :"
            placeholder="Slug"
            className=" hidden"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-full md:w-1/3 px-2 ">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={dbService.getFilePreview(post.featuredimg)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
