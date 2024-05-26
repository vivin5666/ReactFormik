import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home({ setId }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [deletedData, setDeletedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [deletedData]);

  // Books data is fetched from an API for displaying books
  const fetchData = async () => {
    await axios
      .get("https://65dcd0f7e7edadead7eced88.mockapi.io/api/books")
      .then((res) => {
        setBooks(res.data);
      })

      .catch((err) => console.log(err));
  };

  // delete handler for books
  const handleDelete = async (id) => {
    await axios
      .delete(`https://65dcd0f7e7edadead7eced88.mockapi.io/api/books/${id}`)
      .then((res) => {
        toast.success("Book deleted successfully");
        setDeletedData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Pick handler for books to show them in return books page
  const handlePick = async (id) => {
    await axios
      .put(`https://65dcd0f7e7edadead7eced88.mockapi.io/api/books/${id}`, {
        isPicked: true,
      })
      .then(() => {
        toast.success("Book Picked successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  // edit handler for editing a particular book
  const handleEdit = async (id) => {
    setId(id);
    navigate("/edit-book");
  };

  return (
    <>
      <div className="py-4">
        <h1 className="text-center mb-5">Books</h1>
        <div className="row">
          {/* Books data is mapped to show the books in card */}
          {books.map((book) => {
            if (book.isPicked !== true)
              return (
                <div className="col-3 mb-3" key={book.id}>
                  <Card
                    book={book}
                    handleDelete={handleDelete}
                    handlePick={handlePick}
                    isPicked={false}
                    setBooks={setBooks}
                    handleEdit={handleEdit}
                  />
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;