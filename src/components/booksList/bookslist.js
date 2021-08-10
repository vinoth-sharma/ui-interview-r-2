import React, { useEffect, useState } from "react";
import "./bookslist.css";
import axios from "axios";

// const columnName = [
//   "bookId",
//   "bookName",
//   "publisher",
//   "issueDate",
//   "returnDate",
// ];

export function BooksListContainer() {
  const [bookslist, setBooksList] = useState([]);
  const [opBookslist, setOpBooksList] = useState([]);
  //   const [search, setSearchValue] = useState("");
  const [isAsc, setSortAsc] = useState(null);

  useEffect(() => {
    axios.get("/db.json").then((res) => {
      setBooksList(res.data.books);
      setOpBooksList(res.data.books);
    });

    return () => {};
  }, []);

  const _getBooksName = (data) => {

    return data.map((ele, i) => {
      return (
        <div key={i} className="book">
          <div className="bookname">{ele.bookName}</div>
          <div className="author">{ele.author}</div>
        </div>
      );
    });
  };

  const _onChangeHandler = (event) => {
    let l_data = bookslist.filter((ele) => {
      if (ele.bookName.toUpperCase().includes(event.target.value.toUpperCase()))
        return true;
      else return false;
    });
    setOpBooksList(l_data);
  };

  const _sortBooks = () => {
    let l_op = JSON.parse(JSON.stringify(opBookslist));

    let l_data = l_op.sort((a, b) => {
      if (a.bookName.toUpperCase() > b.bookName.toUpperCase()) return 1;
      else if (a.bookName.toUpperCase() < b.bookName.toUpperCase()) return -1;
      else return 0;
    });

    if (!isAsc) setOpBooksList(l_data);
    else {
      setOpBooksList(l_data.reverse());
    }
    setSortAsc(!isAsc);
  };

  return (
    <div className="books-list-container">
      <div className="flex header-table">
        <h2>Library</h2>
        <button>Add Book</button>
      </div>
      <div className="title-table">
        <div className="header-table flex">
          Books Name{" "}
          <button onClick={_sortBooks}>{isAsc ? "desc" : "asc"}</button>
        </div>
        <input type="text" onChange={_onChangeHandler} />
      </div>
      <div className="books-list">{_getBooksName(opBookslist)}</div>
    </div>
  );
}
