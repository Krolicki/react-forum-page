import "./styles/Pagination.css"

export const Pagination = ({postsPerPage, totalPosts}) => {
    const pagesNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pagesNumbers.push(i)
    }
    return(
        <nav className="pages-container">
            <ul className="pages-list">
                {pagesNumbers.map(num => {
                    return(
                        <li key={num} className="page-number">
                            <a href="#" className="page-link">
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