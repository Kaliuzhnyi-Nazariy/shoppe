import AddPhotoAccordion from "../../Product/AddPhotoAccordion";
import Input from "../../Input";
import StyledButton from "../../StyledButton";
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import {
  FormProvider,
  type Path,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type {
  Categories,
  ICreateProduct,
  IProduct,
} from "../../../../features/products/interface";

const ProductForm = ({
  data,
  pending,
  methods,
  submit,
  isUpdateForm = false,
}: {
  data?: IProduct;
  pending: boolean;
  methods: UseFormReturn<ICreateProduct>;
  submit: (submittedData: FormData) => void;
  isUpdateForm?: boolean;
}) => {
  const categoriesList = [
    "ELECTRONICS",
    "GAMING",
    "HOME",
    "OTHER",
    "JEWELRY",
    "BOOKS",
    "FOOD",
  ] as Categories[];

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
        categories: data.categories,
      });
    }
  }, [data, methods]);

  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);

  const [previewFilePhotos, setPreviewFilePhotos] = useState<
    {
      id: string;
      link: string;
    }[]
  >([]);

  const [filterIds, setFilterIds] = useState<string[]>([]);

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

  const categories = methods.watch("categories") || [];

  const categoryClickHandle = (category: Categories) => {
    const nextCategories = categories.includes(category)
      ? categories.filter((cat) => cat !== category)
      : [...categories, category];

    methods.setValue("categories", nextCategories, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const submitHandler: SubmitHandler<ICreateProduct> = (submitData) => {
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
      const existsInDB =
        isUpdateForm &&
        data &&
        data.photos.filter((dp: { link: string }) => dp.link === photo.link)[0];
      if (!photo.link.startsWith("blob:") && existsInDB) {
        formData.append("photos", photo.link);
      }
    });

    categories.forEach((c) => {
      formData.append("categories", c);
    });

    submit(formData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        className="mt-12 flex flex-col gap-10 min-[1024px]:grid min-[1024px]:grid-cols-2 min-[1024px]:m-0 min-[1024px]:items-center"
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

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs gap-2">
            {categoriesList.map((category, ind) => {
              return (
                <li
                  className={
                    "border rounded-sm text-center py-1 transition-colors duration-200 " +
                    (categories.includes(category)
                      ? "border-(--accent) text-(--accent)"
                      : "border-black")
                  }
                  key={ind}
                  onClick={() => categoryClickHandle(category)}
                >
                  {category}
                </li>
              );
            })}
          </ul>
          <StyledButton
            text="UPDATE PRODUCT"
            isValid={methods.formState.isValid}
            pending={pending}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
