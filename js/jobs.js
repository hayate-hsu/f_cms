console.log("加载成功");
var manager=getParam('manager'), token=getParam('token');

var Page = React.createClass({displayName: "Page",
    pageNext: function(){
        var page=this.props.page;
        page++;
        this.props.callbackPage(page);
    },
    pagePrev: function(){
        var page=this.props.page;
        page--;
        this.props.callbackPage(page);
    },
    render: function(){
        return (
            React.createElement("div", {className: "page"}, 
                React.createElement("button", {type: "button", className: "btn btn-default prev", disabled: this.props.start, onClick: this.pagePrev}, "上一页"), 
                React.createElement("button", {type: "button", className: "btn btn-default next", disabled: this.props.end, onClick: this.pageNext}, "下一页")
            )
        )
    }
});

var Table = React.createClass({displayName: "Table",
    deleteJob: function(e){
        this.props.callbackDelete($(e.target).data('value'), $(e.target).data('index'));
    },
    render: function(){
        return (
            React.createElement("table", null, 
                React.createElement("tr", null, React.createElement("th", null, "岗位"), React.createElement("th", null, "操作")), 
                
                    this.props.jobs.map(function(job,index){
                        return (
                            React.createElement("tr", null, 
                                React.createElement("td", null, job.name), 
                                React.createElement("td", null, 
                                    React.createElement("a", {className: "bz", href: "/editjob.html?id="+job.id+"&manager="+manager+"&token="+token}, "编辑"), 
                                    React.createElement("button", {type: "button", className: "btn btn-link deleteJob", onClick: this.deleteJob, "data-index": index, "data-value": job.id}, "删除")
                                )
                            )
                        )
                    }.bind(this))
                
            )
        )
    }
});

var SZBox = React.createClass({displayName: "SZBox",
    getInitialState: function() {
        return {
            list: [],
            page: 0,
            start: true,
            end: false,
            mask: 1
        }
    },
    componentDidMount: function() {
        var self = this;
        JobsFunc('get', '', {manager:manager, token: token, groups: $('#group').val()}, function(data){
            self.setState({list: data.sociology});
        });
    },
    ajaxHandle: function(){
        var self = this;
        var param={
            manager: manager,
            token: token,
            page: this.state.page
        };
        JobsFunc('get', '', param, function(data){
            self.state.page==0 ? self.setState({start: true}) : self.setState({start: false});
            self.state.page==data.end ? self.setState({end: true}) : self.setState({end: false});
            self.setState({list: data.sociology});
        })
    },
    onPage: function(page){
        this.setState({page: page}, function(){
            this.ajaxHandle(page);
        })
    },
    onDelete: function(id, index){
        if(confirm('确定要删除此岗位？')){
            var self = this;
            var param={
                manager: manager,
                token: token,
                mask: this.state.mask
            };
            JobsFunc('delete', id, param, function(data){
                self.state.list.splice(index, 1);
                self.setState({list: self.state.list});
                alert("删除成功！");
            });
        }
    },
    render: function(){
        return (
            React.createElement("div", null, 
                React.createElement(Table, {jobs: this.state.list, mask: this.state.mask, callbackDelete: this.onDelete}), 
                React.createElement(Page, {page: this.state.page, callbackPage: this.onPage, start: this.state.start, end: this.state.end})
            )
        )
    }
});
var XZBox = React.createClass({displayName: "XZBox",
    getInitialState: function() {
        return {
            list: [],
            page: 0,
            start: true,
            end: false,
            mask: 0
        }
    },
    componentDidMount: function() {
        var self = this;
        JobsFunc('get', '', {manager:manager, token: token, groups: $('#group').val()}, function(data){
            self.setState({list: data.school});
        });
    },
    ajaxHandle: function(){
        var self = this;
        var param={
            manager: manager,
            token: token,
            page: this.state.page
        };
        JobsFunc('get', '', param, function(data){
            self.state.page==0 ? self.setState({start: true}) : self.setState({start: false});
            self.state.page==data.end ? self.setState({end: true}) : self.setState({end: false});
            self.setState({list: data.school});
        })
    },
    onPage: function(page){
        this.setState({page: page}, function(){
            this.ajaxHandle(page);
        })
    },
    onDelete: function(id, index){
        if(confirm('确定要删除此岗位？')){
            var self = this;
            var param={
                manager: manager,
                token: token,
                mask: this.state.mask
            };
            JobsFunc('delete', id, param, function(data){
                self.state.list.splice(index, 1);
                self.setState({list: self.state.list});
                alert("删除成功！");
            });
        }
    },
    render: function(){
        return (
            React.createElement("div", null, 
                React.createElement(Table, {jobs: this.state.list, mask: this.state.mask, callbackDelete: this.onDelete}), 
                React.createElement(Page, {page: this.state.page, callbackPage: this.onPage, start: this.state.start, end: this.state.end})
            )
        )
    }
});

React.render(React.createElement(SZBox, null), document.getElementById('social'));
React.render(React.createElement(XZBox, null), document.getElementById('campus'));