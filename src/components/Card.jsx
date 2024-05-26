function Card({
    book,
    handleDelete,
    isPicked,
    handleReturn,
    handlePick,
    handleEdit,
  }) {
    return (
      <>
        <div>
          {/* This is the offcanvas feature from boostrap used to display book details when the user clicks on details button on book card  */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id={`offcanvasExample-${book.id}`}
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h4
                className="offcanvas-title fw-bolder"
                id="offcanvasExampleLabel"
              >
                Book Details
              </h4>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div>
                <span className="fw-bold h3">Title : {book?.title}</span>
              </div>
              <div className="mt-2">
                <span className="h5">
                  <strong>Description</strong> :
                  <p className="lead">{book?.description}</p>
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bolder">Pages : </span>
                {book?.pages}
              </div>
            </div>
          </div>
        </div>
  
        {/* card to display book */}
        <div className="card bg-light">
          <div className="card-body">
            <div className="card-title fw-bolder h4">Title : {book.title}</div>
            <div className="card-text fw-bold">Author : {book.authorName}</div>
            <div className="card-text mt-1">Publisher : {book.publisher}</div>
            <div className="card-text">Published Date :{book.publishedDate}</div>
            <div className="card-text">ISBN No :{book.isbnNumber}</div>
  
            <div className="d-flex flex-column mt-4">
              <button
                className="btn btn-secondary"
                data-bs-toggle="offcanvas"
                data-bs-target={`#offcanvasExample-${book.id}`}
                aria-controls="offcanvasExample"
              >
                Details
              </button>
              <button
                className="btn btn-warning mt-2"
                onClick={() => handleEdit(book.id)}
              >
                Edit
              </button>
              {isPicked ? (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleReturn(book.id)}
                >
                  Return Book
                </button>
              ) : (
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handlePick(book.id)}
                >
                  Pick Book
                </button>
              )}
              <button
                onClick={() => handleDelete(book.id)}
                className="btn btn-danger mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Card;