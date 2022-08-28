import "./styles/Pagination.css"

export const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pagesNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pagesNumbers.push(i)
    }
    return (
        <nav className="pages-container">
            <ul className="pages-list">
                {pagesNumbers.map(num => {
                    return (
                        <li key={num} className="page-number">
                            <a
                                onClick={() => { 
                                    paginate(num)
                                }} 
                                href="#posts-top" 
                                className={`page-link ${currentPage === num ? "active-page" : ""}`}
                            >
                                {num}
                            </a>
                        </li>
                    )
                })
                }
            </ul>
        </nav>
    )
}