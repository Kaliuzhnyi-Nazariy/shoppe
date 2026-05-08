import {
  FormProvider,
  useForm,
  type Path,
  type SubmitHandler,
} from "react-hook-form";
import Section from "../components/Section";
import type {
  ICreateProduct,
  ICreateProductForm,
} from "../../features/products/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidation } from "../validation";
import Input from "../components/Input";
import StyledButton from "../components/StyledButton";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../features/products/requests";
import { useNavigate } from "react-router";
import {
  // useEffect,
  useState,
} from "react";
import AddPhotoAccordion from "../components/Product/AddPhotoAccordion";
import { v4 } from "uuid";
import { errorToast, successToast } from "../components/toast";

const CreateProduct = () => {
  const methods = useForm<ICreateProductForm>({
    mode: "all",
    resolver: zodResolver(productValidation),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    // mutationFn: (data: ICreateProduct) => createProduct(data),
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess() {
      methods.reset({
        additionalInformation: "",
        amount: 0,
        description: "",
        price: 0,
        title: "",
      });
      navigate("/shop");
      successToast("Product is created!");
    },
    onError(err) {
      const error = err as { response?: { data?: { message: string } } };
      errorToast(error.response?.data?.message || "Something went wrong!");
    },
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

  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);

  const [previewLinks, setPreviewLinks] = useState<
    { id: string; link: string }[]
  >([]);

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);

    const photoFiles = newFiles.map((nf) => {
      return {
        id: v4(),
        file: nf,
      };
    });

    const updatedFiles = [...files, ...photoFiles].slice(0, 10);
    setFiles(updatedFiles);

    const newPhotos = photoFiles.map((pf) => ({
      id: pf.id,
      link: URL.createObjectURL(pf.file),
    }));

    setPreviewLinks((prev) => [...prev, ...newPhotos]);
  };

  const clickHandle = ({ id }: { id: string }) => {
    setPreviewLinks(previewLinks.filter((pl) => pl.id !== id));
    setFiles(files.filter((f) => f.id !== id));
  };

  const submitHandle: SubmitHandler<ICreateProductForm> = (submitData) => {
    const formData = new FormData();

    // console.log({ files });

    // photoList.forEach((file) => {
    //   formData.append("product_photo", file);
    // });

    files.forEach(({ file }) => {
      formData.append("product_photo", file);
    });

    formData.append("title", submitData.title);
    formData.append("description", submitData.description);
    formData.append(
      "additionalInformation",
      submitData.additionalInformation || "",
    );
    formData.append("price", String(submitData.price));
    formData.append("amount", String(submitData.amount));
    mutate(formData);
  };

  // console.log("previewLinks.length: ", previewLinks.length);

  return (
    <Section extraStyles="pb-25">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitHandle)}
          className="mt-12 flex flex-col gap-10 min-[1024px]:flex-row min-[1024px]:m-0 min-[1024px]:items-end"
        >
          <AddPhotoAccordion
            images={previewLinks}
            clickHandle={clickHandle}
            onFilesChange={onFilesChange}
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
              text="CREATE PRODUCT"
              isValid={methods.formState.isValid}
              pending={isPending}
            />
          </div>
        </form>
      </FormProvider>
    </Section>
  );
};

export default CreateProduct;
