import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'zine-fj',
            blog: 'https://zine-fj.github.io/',
            blogName: '一世长安'
        }
    },
    render() {
        return (
            <div id="footer">
                <div>Power by {this.author}，欢迎访问作者博客：<a href="{this.blog}" target="_target">{this.blogName}</a></div>
                <br/>
                <span>Hosted by Coding Pages</span>
            </div>
        )
    }
}