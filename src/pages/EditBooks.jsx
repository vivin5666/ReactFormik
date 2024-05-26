/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

function EditBooks({ id }) {
  const [editData, setEditData] = useState({
    title: "",
    authorName: "",
    isbnNumber: 0,
    description: "",
    publisher: "",
    publishedDate: "",
    pages: 0,
    isPicked: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    formik.setValues(editData); //formik.values ->formik.setValues(editdata)
  }, [editData]);

  // fetching the book data and displayed in respective fields in editing page
  const fetchData = async () => {
    await axios
      .get(`https://65dcd0f7e7edadead7eced88.mockapi.io/api/books/${id}`)
      .then((res) => {
        setEditData(res.data);
      });
  };

  const navigate = useNavigate();

  // validation schema provided to useFormik hook
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    authorName: Yup.string().required("Author Name is required"),
    isbnNumber: Yup.number()
      .min(100000)
      .max(999999)
      .required("ISBN number is required"),
    description: Yup.string().required("Description is required"),
    publisher: Yup.string().required("Publisher is required"),
    publishedDate: Yup.date().required("Published Date is required"),
    pages: Yup.number().required("Pages is required"),
  });

  // useFormik is used to manipulate form data
  const formik = useFormik({
    initialValues: { editData }, //formik.values
    validationSchema,
    onSubmit: async (values) => {
      await axios
        .put(
          `https://65dcd0f7e7edadead7eced88.mockapi.io/api/books/${id}`,
          values
        ) //values{}
        .then(() => {
          toast.success("Book Updated SuccessFully");
        })
        .catch((err) => console.log(err));
      navigate("/");
    },
  });

  return (
    <div className="container bg-light mt-5 px-5 py-5 w-50 rounded">
      <h1 className="text-center mb-4">Edit Book</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Title input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div className="text-danger">{formik.errors.title}</div>
        </div>
        {/* Author Name Input */}
        <div className="mb-3">
          <label htmlFor="authorName" className="form-label">
            Author Name
          </label>
          <input
            type="text"
            className="form-control"
            id="authorName"
            name="authorName"
            onChange={formik.handleChange}
            value={formik.values.authorName}
          />
          <div className="text-danger">{formik.errors.authorName}</div>
        </div>
        {/* ISBN Number */}
        <div className="mb-3">
          <label htmlFor="isbnNumber" className="form-label">
            ISBN Number
          </label>
          <input
            type="number"
            className="form-control"
            id="isbnNumber"
            name="isbnNumber"
            onChange={formik.handleChange}
            value={formik.values.isbnNumber}
          />
          <div className="text-danger">{formik.errors.isbnNumber}</div>
        </div>
        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <div className="text-danger">{formik.errors.description}</div>
        </div>
        {/* Published Date */}
        <div className="mb-3">
          <label htmlFor="publishedDate" className="form-label">
            Publisher Date
          </label>
          <input
            type="date"
            className="form-control"
            id="publishedDate"
            name="publishedDate"
            onChange={formik.handleChange}
            value={formik.values.publishedDate}
          />
          <div className="text-danger">{formik.errors.publisherDate}</div>
        </div>
        {/* Publisher Name */}
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">
            Publisher Name
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            name="publisher"
            onChange={formik.handleChange}
            value={formik.values.publisher}
          />
          <div className="text-danger">{formik.errors.publisher}</div>
        </div>
        {/* Pages */}
        <div className="mb-3">
          <label htmlFor="pages" className="form-label">
            Pages
          </label>
          <input
            type="number"
            className="form-control"
            id="pages"
            name="pages"
            onChange={formik.handleChange}
            value={formik.values.pages}
          />
          <div className="text-danger">{formik.errors.pages}</div>
        </div>
        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-success">
            Update Book
            <i className="fa-solid fa-plus ms-2"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBooks;