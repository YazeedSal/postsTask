const input = document.querySelector('#myInput')
const btn = document.getElementById('myBtn')
class Post {
    constructor(content, id, owner) {
        this.owner = owner
        this.id = id
        this.content = content
        this.isLiked = false
        this.comments = []
        this.date = Date.now()
    }
    toggleLike() {
        this.isLiked = !this.isLiked
    }
    addComment(comment) {
        this.comments.push(comment)
    }
}

class App {
    constructor(user) {
        this.user = user
        this.posts = []
    }
    addPost(content) {
        const id = "post" + this.posts.length + '-' + Date.now()
        const post = new Post(content, id, this.user)
        this.posts.unshift(post)
    }
    getPostsFromDb() {
        // //
        // const postsDb = []
        // this.posts = postsDb
    }
}

class Renderer {
    constructor() {

        this.postsContainer = document.querySelector('.postsContainer')
    }
    createPostContainer() {
        const postContainer = document.createElement('div')
        postContainer.classList.add('postContainer')
        return postContainer
    }
    createContent(text) {
        const contentContainer = document.createElement('div')
        contentContainer.classList.add('contentContainer')
        const content = document.createElement('h1')
        content.classList.add('content')
        content.innerText = text
        contentContainer.append(content)
        input.value = ''
        return contentContainer
    }
    createActions(post, posts) {
        const actionsContainer = document.createElement('div')
        actionsContainer.classList.add('actionsContainer')
        const likeBtn = document.createElement('div')
        likeBtn.classList.add('likeBtn')
        likeBtn.innerText = post.isLiked ? 'liked' : 'Like'
        likeBtn.addEventListener('click', () => {
            post.toggleLike()
            this.renderPosts(posts)
        })
        const commentBtn = document.createElement('div')
        commentBtn.innerText = 'Comment'
        commentBtn.classList.add('commentBtn')
        const commentsCon = document.createElement('div')
        const commentsInput = document.createElement('input')
        commentsInput.classList.add('commentsInput')
        const sumbitBtn = document.createElement('div')
        sumbitBtn.classList.add('sumbitBtn')
        const closeBtn = document.createElement('div')
        closeBtn.classList.add('closeBtn')

        commentBtn.addEventListener('click', () => {
            commentsCon.append(commentsInput)
            sumbitBtn.innerText = 'Sumbit'
            closeBtn.innerText = 'x'
            commentsCon.append(sumbitBtn)
            commentsCon.append(closeBtn)
            //commentsCon.append(post.comments)
            for (let i = 0; i < post.comments.length; i++) {
                const block = document.createElement('div')
                block.innerText = post.comments[i]
                commentsCon.append(block)

            }


        })
        closeBtn.addEventListener('click', () => {
            commentsCon.innerHTML = ''
            addedComments.innerHTML = ''
        })

        const addedComments = document.createElement('div')
        addedComments.classList.add('addedComments')

        sumbitBtn.addEventListener('click', () => {
            post.comments.push(commentsInput.value)
            console.log(post.comments);
            addedComments.innerHTML += `<div>${commentsInput.value}</div>`
            actionsContainer.append(addedComments)
            commentsInput.value = ''
        })



        actionsContainer.append(likeBtn, commentBtn, commentsCon)
        return actionsContainer
    }

    createPost(post, posts) {
        const postContainer = this.createPostContainer()
        const contentContainer = this.createContent(post.content)
        const actionsContainer = this.createActions(post, posts)
        postContainer.append(contentContainer, actionsContainer)
        this.postsContainer.append(postContainer)
    }

    renderPosts(posts) {
        this.postsContainer.innerHTML = ''
        for (let i = 0; posts[i]; i++) {
            this.createPost(posts[i], posts)
        }
    }


}





const renderer = new Renderer()
const app = new App('Rami')
renderer.renderPosts(app.posts)

btn.addEventListener('click', function () {
    if (input.value) {
        const content = input.value
        app.addPost(content)
        renderer.renderPosts(app.posts)
    }

})





