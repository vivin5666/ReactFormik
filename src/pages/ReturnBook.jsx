import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function ReturnBook({ setId }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // Lended Books data is fetched from an API for displaying books
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
      .then(() => {})
      .catch((err) => console.log(err));
  };

  // Return handler for books to show them in Home page
  const handleReturn = async (id) => {
    await axios
      .put(`https://65dcd0f7e7edadead7eced88.mockapi.io/api/books/${id}`, {
        isPicked: false,
      })
      .then(() => {
        toast.success("Book Returned successfully");
        fetchData();
      });
  };

  // edit handler for editing a particular book
  const handleEdit = async (id) => {
    setId(id);
    navigate("/edit-book");
  };

  return (
    <div>
      <div className="py-4">
        <h1 className="text-center mb-5">Lended Books</h1>
        <div className="row">
          {/* Lended books data is mapped to be displayed in cards */}
          {books.map((book) => {
            if (book.isPicked !== false)
              return (
                <div className="col-3 mb-3" key={book.id}>
                  <Card
                    book={book}
                    handleDelete={handleDelete}
                    isPicked={true}
                    handleReturn={handleReturn}
                    handleEdit={handleEdit}
                    handlePick={() => {}}
                  />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReturnBook;