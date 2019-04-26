import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import _ from 'lodast';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      todolist : [], //store todo object
      type:"", //store typing input
      showCompleted: true,
      lastId: 0,
    }
  }

  onChange = (e) => {
    this.setState({type: e.target.value})
  }

  onCreateNewItem = (e) => {
    e.preventDefault();
    const newitem = {id: this.state.lastId, title: this.state.type, isCompleted: false}
    // const newitem = {id: this.state.counter, title: this.state.type, isCompleted: false}
    // const newitem = {title: this.state.type, isCompleted: false}
    const newlist = this.state.todolist.slice();
    newlist.push(newitem);
    this.setState({todolist: newlist, type:"", lastId:this.state.lastId+1});
  }

  // onCreateNewItem=()=>{
  //   this.setState(({todolist})) => ({
  //     todolist: [...last,{id:lastId,title: 'Task ${lastID}',isCompleted:false}],
  //     lastId: lastId+1,
  //   });
  // }
//
  onCheck = (id) =>{
    const newlist = this.state.todolist.slice();
    // newlist[id].isCompleted = !newlist[id].isCompleted;
    const selectedItem = newlist.find((item)=>item.id===id)
    selectedItem.isCompleted = !selectedItem.isCompleted;
    this.setState({todolist: newlist});
  }

  //
  // onToggleListItem = (itemId) =>{
  //     this.setState({}) => ({})
  //
  // }

  //

  filterIncompleted(list){
    var newlist = list.slice();
    const incompletedList = newlist.filter((item)=>!item.isCompleted)
    return incompletedList;
  }

  filterCompleted(list){
    var newlist = list.slice();
    const completedList = newlist.filter((item)=>item.isCompleted)
    return completedList;
  }

  onToggleCompletedItem = (e) =>{
    e.preventDefault();
    this.setState({
      showCompleted : !this.state.showCompleted
    });
  }

  onDeleteTask = (id) => {
        const list = this.state.todolist.slice();
        const newlist = list.filter((item)=>item.id!==id)
        this.setState({todolist: newlist});
  }

  render(){
    console.log(this.state.todolist[0])
    console.log(this.state.todolist[this.state.todolist.length-1])

    const completedList = this.filterCompleted(this.state.todolist);
    const incompletedList = this.filterIncompleted(this.state.todolist);

    return(
      <div className='container'>
        {/* Header */}
        <div className="">
          <h1>To-Do <small>List</small></h1>
          <hr/>
        </div>
        <div className="">
          <div className="row">
            <div className="col">
              <form class="form-inline">
                <div className="form-group mr-2">
                  <input className="form-control" type="text" value={this.state.type} onChange={this.onChange} placeholde="New List" required="required"/>
                </div>
                <div className="form-group mr-2">
                  <button className="btn btn btn-primary" onClick={this.state.type !== "" && this.onCreateNewItem}>+</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex flex-row p-2">
              <h2>{completedList.length} Completed</h2>
              {/* <label className="btn btn-secondary"> */}
            </div>
          </div>
          <div className="d-flex flex-row-reverse p-2">
            <button  className="btn btn-secondary " onClick={this.onToggleCompletedItem}>{this.state.showCompleted?'HIDE':'SHOW'}</button>
          </div>
        </div>
        {/* End Header */}

        <hr/>
        {this.state.showCompleted && <List list={completedList} onCheck={this.onCheck} onDeleteTask={this.onDeleteTask} />}
        <List list={incompletedList} onCheck={this.onCheck} onDeleteTask={this.onDeleteTask}  />
        <Header {...this.state} onChange={this.onChange} onClick={this.onCreateNewItem} completedList={completedList}/>
      </div>
    )
  }
}



class Header extends Component {
  render(){
    return(
    // {/* Header */}
      <div className="">
        <h1>To-Do <small>List</small></h1>
        <hr/>
        <div className="">
          <div className="row">
            <div className="col">
              <form class="form-inline">
                <div className="form-group mr-2">
                  <input className="form-control" type="text" value={this.props.type} onChange={this.props.onChange} placeholde="New List" required="required"/>
                </div>
                <div className="form-group mr-2">
                  <button className="btn btn btn-primary" onClick={this.props.type !== "" && this.props.onCreateNewItem}>+</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex flex-row p-2">
              <h2>{this.props.completedList.length} Completed</h2>
              {/* <label className="btn btn-secondary"> */}
            </div>
          </div>
          <div className="d-flex flex-row-reverse p-2">
            <button  className="btn btn-secondary " onClick={this.props.onToggleCompletedItem}>{this.props.showCompleted?'HIDE':'SHOW'}</button>
          </div>
        </div>
      </div>
    // {/* End Header */}
    )
  }
}

class List extends Component {

  render(){
    return (
      <div className="">
        {this.props.list.map((item)=>
          <ListItem key={item.id} {...item} onCheck={this.props.onCheck} onDeleteTask={this.props.onDeleteTask}/>
        )}
      </div>
    );
  }
}

class ListItem extends Component {
  onChangeCheckbox = (e) => {
    // const toggle = this.props.isCompleted;
    this.props.onCheck(this.props.id);
  }
  onDeleteTask = (e) =>{
    e.preventDefault()
    this.props.onDeleteTask(this.props.id)
  }

  onClick = () =>{
    // this.prop. (this.props.id)
  }

  render(){
    const { id, title, isCompleted} = this.props // จัดว่ามีอะไรบ้างอยู่ใน state
    return(
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input className="" type="checkbox" checked={isCompleted} onChange={this.onChangeCheckbox} aria-label="Checkbox for following text input"/>
          </div>
        </div>
        <input type="text" className="form-control" value={title} aria-label="Text input with checkbox" onClick={this.onClick}></input>
        <button className="btn btn-danger btn-circle close" onClick={this.onDeleteTask}><i className="fa fa-times" /></button>
      </div>
    );
  }
}

export default App;
