import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductById,
  updateProduct,
} from "../../features/products/requests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productValidation } from "../validation";
import type { ICreateProduct } from "../../features/products/interface";
import Section from "../components/Section";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "../components/toast";
import { OrbitProgress } from "react-loading-indicators";
import ProductForm from "../components/Routes/ProfductForm/ProductForm";

const UpdateProduct = () => {
  const link = window.location.pathname.split("/");
  const id = link[link.length - 1];

  const { data, isPending: fetchingProduct } = useQuery({
    queryKey: ["getProduct", { productId: id }],
    queryFn: () => getProductById(id),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const methods = useForm<ICreateProduct>({
    mode: "all",
    resolver: zodResolver(productValidation),
  });

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

  const handleSubmit = (submittedData: FormData) => {
    mutate({
      mutationData: submittedData,
      productId: id,
    });
  };

  return (
    <Section extraStyles="pb-25">
      {fetchingProduct ? (
        <div className="flex flex-col flex-1 items-center justify-center">
          <OrbitProgress color="var(--gray)" size="small" />
        </div>
      ) : (
        <ProductForm
          isUpdateForm
          data={data}
          methods={methods}
          submit={handleSubmit}
          pending={updatingProduct}
          key={"form"}
        />
      )}
    </Section>
  );
};

export default UpdateProduct;
