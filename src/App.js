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

  onCheck = (id) =>{
    const newlist = this.state.todolist.slice();
    // newlist[id].isCompleted = !newlist[id].isCompleted;
    const selectedItem = newlist.find((item)=>item.id===id)
    selectedItem.isCompleted = !selectedItem.isCompleted;
    this.setState({todolist: newlist});
  }

  onEdit = (id,e) =>{
    const newlist = this.state.todolist.slice();
    const selectedItem = newlist.find((item)=>item.id===id)
    selectedItem.title = e.target.value;
    this.setState({todolist: newlist});
  }

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
        <Header {...this.state} onChange={this.onChange} onCreateNewItem={this.onCreateNewItem} completedList={completedList} onToggle={this.onToggleCompletedItem}/>
        <hr/>
        {this.state.showCompleted && <List list={completedList} onCheck={this.onCheck} onDeleteTask={this.onDeleteTask} onEdit={this.onEdit} />}
        <List list={incompletedList} onCheck={this.onCheck} onDeleteTask={this.onDeleteTask} onEdit={this.onEdit} />
      </div>
    )
  }
}



class Header extends Component {
  render(){
    return(
      <div className="">
        <h1>To-Do <small>List</small></h1>
        <hr/>
        <div className="">
          <div className="row">
            <div className="col">
              <form class="form-inline">
                <div className="form-group mr-2">
                  <input className="form-control" type="text" value={this.props.type} onChange={(e)=>this.props.onChange(e)} placeholde="New List" required="required"/>
                </div>
                <div className="form-group mr-2">
                  <button className="btn btn btn-primary" onClick={this.props.type !== "" && ((e)=>this.props.onCreateNewItem(e))}>+</button>
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
            <button  className="btn btn-secondary auto" onClick={(e)=>this.props.onToggle(e)}>{this.props.showCompleted?'HIDE':'SHOW'}</button>
          </div>
        </div>
      </div>
    )
  }
}

class List extends Component {

  render(){
    return (
      <div className="">
        {this.props.list.map((item)=>
          <ListItem key={item.id} {...item} onCheck={this.props.onCheck} onDeleteTask={this.props.onDeleteTask} onEdit={this.props.onEdit}/>
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

  render(){
    const { id, title, isCompleted} = this.props
    return(
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input className="" type="checkbox" checked={isCompleted} onChange={this.onChangeCheckbox} aria-label="Checkbox for following text input"/>
          </div>
        </div>
        <input type="text" className="form-control" value={title} aria-label="Text input with checkbox" onChange={(e)=>this.props.onEdit(this.props.id,e)}></input>
        <button className="btn btn-default " onClick={this.onDeleteTask}><i className="fa fa-times" /></button>
      </div>
    );
  }
}

export default App;
