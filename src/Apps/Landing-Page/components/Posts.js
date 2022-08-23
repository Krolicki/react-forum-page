import './styles/Posts.css'

export const Posts = () => {
    return (
        <div className='posts-container'>
            <section className='posts'>
                <div className='post'>
                    <div className='post-head'>
                        <h2>Post 1</h2>
                        <p>Date: 23-08-2022</p>
                    </div>
                    <p className='post-desc'>Eu proident sit sit pariatur laborum tempor consectetur officia aliqua.</p>
                    <button>Show post</button>
                </div>
                <div className='post'>
                    <div className='post-head'>
                        <h2>Post 2</h2>
                        <p>Date: 23-08-2022</p>
                    </div>
                    <p className='post-desc'>Nulla magna eiusmod sint deserunt non eu consequat qui eiusmod do irure esse non id.</p>
                    <button>Show post</button>
                </div>
            </section>
        </div>
    )
}