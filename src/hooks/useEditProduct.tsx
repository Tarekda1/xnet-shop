import useAxios from "./useAxios";
import { PostedProduct } from "../entities/Product";
import { uuidFromUuidV4 } from "../utils/getUUID";
import { getToken } from "../utils/storageUtils";

const useEditProduct = () => {
  const [postProduct, postProductState] = useAxios();
  const user = getToken();

  const handleEditProduct = async (product: PostedProduct) => {
    // Send the userForm object to your API to add a new user
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("price", String(product?.price));
    formData.append("barcode", product?.barcode || uuidFromUuidV4());
    formData.append("description", product?.description);
    formData.append("category", product?.category);
    formData.append("supplier", product?.supplier);
    console.log(product.image);
    if (product.image !== undefined)
      formData.append("image", product?.image[0] as File); // Append the image file

    console.log(formData);

    try {
      const res = await postProduct({
        url: `${process.env.REACT_APP_API_URL}/products/${product._id}`,
        method: "put",
        data: formData,
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
      console.log("User data to be submitted:", product);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { handleEditProduct, postProductState };
};

export default useEditProduct;
