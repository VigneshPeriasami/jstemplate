jest.dontMock('../helloworld.js');
//jest.autoMockOff();

describe('CommentBox rendering tests', function() {
  it('adds 1 + 2 to equals 3', function() {
    var helloworld = require('../helloworld.js');
    var React = require('react/addons');
    expect(helloworld.doSum(1, 2)).toBe(3);
  });

  it('calls the handle on click on CommentForm', function() {
    var React = require('react/addons');
    var CommentForm = require('../helloworld.js').CommentForm;
    var TestUtils = React.addons.TestUtils;
    var func = jest.genMockFunction();
    var commentForm = TestUtils.renderIntoDocument(
      <CommentForm onSubmit={func} />
    );
    var button = TestUtils.findRenderedDOMComponentWithTag(commentForm, 'input');
    TestUtils.Simulate.click(button);
    expect(func.mock.calls.length).toBe(1);
    expect(func.mock.calls[0][0]).toBe(button.getDOMNode().value);
  });

  it('adds data on submit button click', function() {
    var React = require('react/addons');
    var CommentBox = require('../helloworld.js').CommentBox;
    var TestUtils = React.addons.TestUtils;

    var callSend = jest.genMockFunction();

    var commentBox = TestUtils.renderIntoDocument(<CommentBox send={callSend} />);

    var submit = TestUtils.findRenderedDOMComponentWithTag(commentBox, 'input');
    var expectedCount = commentBox.state.data.length + 1;
    TestUtils.Simulate.click(submit);

    var comments = TestUtils.scryRenderedDOMComponentsWithClass(commentBox, 'comment');
    expect(comments.length).toBe(expectedCount);
    expect(commentBox.state.data.length).toBe(expectedCount);
    expect(callSend.mock.calls.length).toBe(1);
  });
});
