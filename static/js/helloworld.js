var React = require('react/addons');

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: [{'author': 'Nobody', 'said': 'Nothing!!!'}]};
  },
  enterComment: function(message) {
    var data = this.state.data;
    data.push({'author': 'Guest', 'said': message});
    this.setState(data);
    this.props.send(message);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1> Comment Box </h1>
        <CommentList data={this.state.data} />
        <CommentForm onSubmit={this.enterComment}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (<Comment author={comment.author} said={comment.said} />);
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        {this.props.author} said {this.props.said}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleClick: function(event) {
    this.props.onSubmit(event.target.value);
  },
  render: function() {
    return (
      <input type="button" value="add something" onClick={this.handleClick} />
    );
  }
});

function sum(a, b) {
  return a + b;
}

module.exports = {
  doSum : sum,
  CommentForm: CommentForm,
  CommentBox: CommentBox
};
