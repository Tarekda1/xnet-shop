import useAxios from "./useAxios";
import { PostedProduct } from "../entities/Product";
import { uuidFromUuidV4 } from "../utils/getUUID";

const useAddProduct = () => {
  const [postProduct, postProductState] = useAxios();

  const handleAddProduct = async (product: PostedProduct) => {
    // Send the userForm object to your API to add a new user
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("price", String(product?.price));
    formData.append("barcode", product?.barcode || uuidFromUuidV4());
    formData.append("description", product?.description);
    if (product.image !== undefined)
      formData.append("image", product.image[0] as File); // Append the image file

    try {
      const res = await postProduct({
        url: `${process.env.REACT_APP_API_URL}/products`,
        method: "POST",
        data: formData,
      });

      // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
      console.log("User data to be submitted:", product);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { handleAddProduct, postProductState };
};

export default useAddProduct;
