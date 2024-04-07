import * as yup from "yup";

export const MutateCoinSchema = yup.object().shape({
  digitalAsset: yup.string().required("Digital Asset is required!"),
  img: yup.string().notRequired(),
  detail: yup.string().required("Detail is required!"),
  market: yup.string().required(""),
  quantity: yup
    .number()
    .required("Quantity is required!")
    .typeError("Quantity is required!")
    .moreThan(0, "Quantity must be greater than 0"),
  price: yup
    .number()
    .required("Price is required!")
    .typeError("Price is required!")
    .moreThan(0, "Price must be greater than 0"),
});
