import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductById,
  updateProduct,
} from "../../features/products/requests";
import {
  FormProvider,
  useForm,
  type Path,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidation } from "../validation";
import type { ICreateProduct } from "../../features/products/interface";
import Section from "../components/Section";
import AddPhotoAccordion from "../components/Product/AddPhotoAccordion";
import Input from "../components/Input";
import StyledButton from "../components/StyledButton";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { v4 } from "uuid";
import { errorToast, successToast } from "../components/toast";
import { OrbitProgress } from "react-loading-indicators";

const UpdateProduct = () => {
  const link = window.location.pathname.split("/");
  const id = link[link.length - 1];

  const { data, isPending: fetchingProduct } = useQuery({
    queryKey: ["getProduct", { productId: id }],
    queryFn: () => getProductById(id),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending: updatingProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      methods.reset({
        additionalInformation: "",
        amount: 0,
        description: "",
        price: 0,
        title: "",
      });

      await queryClient.invalidateQueries({
        queryKey: ["getProduct", { productId: id }],
      });

      await navigate("/product/" + id);

      successToast("Product is updated!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
  });

  const methods = useForm<ICreateProduct>({
    mode: "all",
    resolver: zodResolver(productValidation),
  });

  type InputConfig = {
    name: Path<ICreateProduct>;
    label: string;
    type?: string;
  };

  const inputs: InputConfig[] = [
    { name: "title", label: "Title*" },
    { name: "description", label: "Description*" },
    { name: "additionalInformation", label: "Additional information" },
    { name: "price", label: "Price*", type: "number" },
    { name: "amount", label: "Amount", type: "number" },
  ] as const;

  // focus on backend update product and product rate and so on

  useEffect(() => {
    if (data) {
      methods.reset({
        title: data.title,
        additionalInformation: data.additionalInformation,
        amount: data.amount,
        description: data.description,
        price: data.price,
      });
    }
  }, [data, methods]);

  // const createLocalURL = (files: File[]) => {
  //   return files.map((ph) => URL.createObjectURL(ph));
  // };

  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);
  // const [files, setFiles] = useState<File[]>([]);

  const [previewFilePhotos, setPreviewFilePhotos] = useState<
    {
      id: string;
      link: string;
    }[]
  >([]);

  const [filterIds, setFilterIds] = useState<string[]>([]);

  // const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFiles = Array.from(e.target.files ?? []);

  //   const photoFiles = newFiles.map((nf) => {
  //     return { id: v4(), file: nf };
  //   });

  //   const updatedFiles = [...files, ...photoFiles].slice(0, 10);
  //   // const updatedFiles = [...files, ...newFiles].slice(0, 10);

  //   setFiles(updatedFiles);

  //   const updatedFilesFiles = updatedFiles.map((up) => up.file);

  //   const newURLs = createLocalURL(updatedFilesFiles);
  //   // const newURLs = createLocalURL(updatedFiles);

  //   // const newPhotos = updatedFiles.map((f, idx) => ({
  //   //   id: f.name + "_" + f.lastModified,
  //   //   link: newURLs[idx],
  //   // }));

  //   const newPhotos = updatedFiles.map((f, idx) => ({
  //     id: generatedId!,
  //     link: newURLs[idx],
  //   }));

  //   setPreviewFilePhotos((prev) => [...prev, ...newPhotos]);
  // };

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);

    const photoFiles = newFiles.map((nf) => ({
      id: v4(),
      file: nf,
    }));

    const updatedFiles = [...files, ...photoFiles].slice(0, 10);
    setFiles(updatedFiles);

    const newPhotos = photoFiles.map((f) => ({
      id: f.id,
      link: URL.createObjectURL(f.file),
    }));

    setPreviewFilePhotos((prev) => [...prev, ...newPhotos]);
  };

  const db = data?.photos ?? [];

  // const clickHandle = ({ id, link }: { id: string; link: string }) => {
  //   console.log({ id, link });

  //   setFilterIds((prev) => [...prev, id]);
  //   if (link.startsWith("blob:")) {
  //     console.log(link);
  //   }
  // };

  const clickHandle = ({ id, link }: { id: string; link: string }) => {
    setFilterIds((prev) => [...prev, id]);

    if (link.startsWith("blob:")) {
      setFiles((prev) => prev.filter((f) => f.id !== id));

      setPreviewFilePhotos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const previewLinks = useMemo(() => {
    const filteredDb = db.filter(
      (p: { id: string }) => !filterIds.includes(p.id),
    );

    if (!files || files.length === 0) return filteredDb;

    return [...filteredDb, ...previewFilePhotos].filter(
      (p) => !filterIds.includes(p.id),
    );
  }, [db, files, filterIds, previewFilePhotos]);

  const submitHandle: SubmitHandler<ICreateProduct> = (submitData) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("product_photo", file.file);
    });

    formData.append("title", submitData.title);
    formData.append("description", submitData.description);
    formData.append(
      "additionalInformation",
      submitData.additionalInformation || "",
    );
    formData.append("price", String(submitData.price));
    formData.append("amount", String(submitData.amount));
    previewLinks.forEach((photo: { id: string; link: string }) => {
      const existsInDB = data.photos.filter(
        (dp: { link: string }) => dp.link === photo.link,
      )[0];
      if (!photo.link.startsWith("blob:") && existsInDB) {
        formData.append("photos", photo.link);
      }
    });

    mutate({
      mutationData: formData,
      productId: id,
    });
  };

  return (
    <Section extraStyles="pb-25">
      {fetchingProduct ? (
        <div className="flex flex-col items-center justify-center">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submitHandle)}
            className="mt-12 flex flex-col gap-10 min-[1440px]:flex-row min-[1440px]:items-end min-[1440px]:mt-0"
          >
            <AddPhotoAccordion
              images={previewLinks}
              clickHandle={clickHandle}
              onFilesChange={changeFile}
            />
            <div className="flex flex-col gap-10 w-full">
              {inputs.map((i) => {
                return (
                  <Input<ICreateProduct>
                    label={i.label}
                    name={i.name}
                    type={i.type}
                    key={i.name}
                  />
                );
              })}
              <StyledButton
                text="UPDATE PRODUCT"
                isValid={methods.formState.isValid}
                pending={updatingProduct}
              />
            </div>
          </form>
        </FormProvider>
      )}
    </Section>
  );
};

export default UpdateProduct;
