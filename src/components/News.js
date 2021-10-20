import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=8e685ce9b2e540b29824b8e5d3c06851&page=2";
        let data = await fetch(url);
        let Parsedata = await data.json();
        console.log(Parsedata);
        this.setState({ articles: Parsedata.articles })
    }
    handlePrevlClick = async () => {
        console.log("Prev click");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8e685ce9b2e540b29824b8e5d3c06851&page=${this.state.page - 1}pageSize=2`;
        let data = await fetch(url);
        let Parsedata = await data.json();
        console.log(Parsedata);
        this.setState({
            page: this.state.page - 1,
            articles: Parsedata.articles
        })
    }
    handleNextClick = async () => {
        console.log("NextClick");
        console.log("Prev click");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8e685ce9b2e540b29824b8e5d3c06851&page-${this.state.page + 1}`;
        let data = await fetch(url);
        let Parsedata = await data.json();
        console.log(Parsedata);
        this.setState({
            page: this.state.page + 1,
            articles: Parsedata.articles
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMokey- Top headlines</h1>
                <Spinner/>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between" >
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevlClick}>&larr; Previous</button>
                    <button rel="noreferrer" type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News
