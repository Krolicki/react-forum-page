import { useEffect, useMemo } from "react"
import "./styles/Pagination.css"

export const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage)
    let pagesNumbers = []

    for (let i = 1; i <= totalPages; i++) {
        pagesNumbers.push(i)
    }

    if(pagesNumbers.length>=10){
        if(currentPage<4){
            pagesNumbers = pagesNumbers.slice(0,5)
            pagesNumbers.push("...")
            pagesNumbers.push(Math.ceil(totalPosts / postsPerPage))
        }
        else if(currentPage>totalPages-4){
            pagesNumbers = pagesNumbers.slice(currentPage-3,currentPage+3)
            pagesNumbers.unshift(" ...")
            pagesNumbers.unshift(1)
        }
        else{
            pagesNumbers = pagesNumbers.slice(currentPage-2,currentPage+3)
            pagesNumbers.unshift(" ...")
            pagesNumbers.unshift(1)
            pagesNumbers.push("...")
            pagesNumbers.push(Math.ceil(totalPosts / postsPerPage))

        }
    }

    return (
        <div className="pages-container">
            <ul className="pages-list">
                {pagesNumbers.map(num => {
                    return (
                        <li key={num} className="page-number">
                            <a
                                onClick={() => {
                                    if(num!=="..." && num!==" ...") 
                                        paginate(num)
                                    else if(num==="...")
                                        paginate(currentPage+4)
                                    else if(num===" ...")
                                        paginate(currentPage-3)
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
        </div>
    )
}