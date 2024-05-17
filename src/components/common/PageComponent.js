const PageComponent = ({ serverData, movePage, handleClickPage }) => {
  return (
    <div>
      {serverData.prev ? (
        <div onClick={() => movePage({ page: serverData.prevPage })}>Prev </div>
      ) : (
        <></>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 w-12  text-center rounded shadow-md text-white ${
            serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"
          }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div onClick={() => movePage({ page: serverData.nextPage })}>Next</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageComponent;
