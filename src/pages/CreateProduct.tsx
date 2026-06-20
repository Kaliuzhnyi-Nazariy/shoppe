import { useForm } from "react-hook-form";
import Section from "../components/Section";
import type { ICreateProduct } from "../../features/products/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidation } from "../validation";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../features/products/requests";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "../components/toast";
import ProductForm from "../components/Routes/ProfductForm/ProductForm";

const CreateProduct = () => {
  const methods = useForm<ICreateProduct>({
    mode: "all",
    resolver: zodResolver(productValidation),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => createProduct(data),
    onSuccess() {
      methods.reset({
        additionalInformation: "",
        amount: 0,
        description: "",
        price: 0,
        categories: [],
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

  const handleSubmit = (submittedData: FormData) => {
    mutate(submittedData);
  };

  return (
    <Section extraStyles="pb-25">
      <ProductForm
        methods={methods}
        submit={handleSubmit}
        pending={isPending}
        key={"form"}
      />
    </Section>
  );
};

export default CreateProduct;
