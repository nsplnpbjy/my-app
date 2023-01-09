import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Dialog, IconButton, InputBase, Slide, TextField} from "@material-ui/core";
import {ArrowBack, BorderColor, ChatBubble, LaptopChromebookOutlined, Search} from "@material-ui/icons";
import axios from "axios";
import moment from "moment";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        flexGrow: 1,
    },
    inputInput: {
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        color: 'inherit',
        backgroundColor:'grey',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    showText:{
        textAlign: 'center'
    }

}));

const baseURL = "https://comradegenrr.top:8080/";
axios.defaults.headers.post["Access-Control-Allow-Origin"]="*";
function CloseIcon() {
    return null;
}

export default function Album() {
    const classes = useStyles();
    //界面所需控制
    const [needChange,setNeedChange] = useState([1,2]);
    const [open, setOpen] = React.useState(false);
    const [diaCard,setDiaCard] = useState("");


    //卡片信息
    const [cards,setCards] = useState([{
        headLine:"正在加载",
        id:"正在加载",
        mainText:"正在加载"
    }]);
    //提交所需信息
    const [datetimeLocal,setDateTimeLocal] = useState(moment().format("YYYY-MM-DDTHH:mm"));
    const [headLine,setHeadLine] = useState("");
    const [mainText,setMainText] = useState('');
    const [curruntId,setCurruntId] = useState("");
    //搜索所需信息
    const [searchText,setSearchText] = useState('');

    //页面加载完毕后需要做的数据更新
    useEffect(()=>{
        axios.post(baseURL+"search",{searchTextSend:"allShow"}).then((e)=>{setCards(e.data.cards)});
    },needChange);

    //提交函数
    function submit(){
        if (curruntId!=""){
            alert("当前正在编辑往期")
            return;
        }
        if (headLine==""){
            alert("标题不能为空")
            return;
        }
        var data = {
            datetimeLocalSend: datetimeLocal,
            headLineSend: headLine,
            mainTextSend: mainText
        }
        // eslint-disable-next-line no-restricted-globals
        axios.post(baseURL+"post",data).then((res)=>{if(res.data.isOk){alert("提交成功");location.reload()}else{alert("提交失败")}});
    }

    //更新函数
    function update(){
        if (curruntId==""){
            alert("当前未在编辑往期");
            return
        }
        var data = {
            datetimeLocalSend: datetimeLocal,
            headLineSend: headLine,
            mainTextSend: mainText,
            id:curruntId
        }
        // eslint-disable-next-line no-restricted-globals
        axios.post(baseURL+"update",data).then((res)=>{if(res.data.isOk){alert("更新成功");location.reload()}else{alert("更新失败")}});
    }
    //删除函数
    function deletor(){
        if (curruntId==""){
            alert("未选择要删除的对象");
            return;
        }
        var data = {
            id:curruntId
        }
        // eslint-disable-next-line no-restricted-globals
        axios.post(baseURL+"delete",data).then((res)=>{if(res.data.isOk){alert("删除成功");location.reload()}else{alert("删除成功")}});
    }

    //搜索函数
    function search(){
        var data = {
            searchTextSend:searchText
        }
        axios.post(baseURL+"search",data).then((e)=>{if (e.data.statueCode==401){alert("搜索值不能为空");return};setCards(e.data.cards)});
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <LaptopChromebookOutlined className={classes.icon} />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" color="inherit" noWrap>
                                白胖的工作笔记
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <InputBase  placeholder="搜索…" onChange={(e)=>setSearchText(e.target.value)} className={classes.inputInput} fullWidth={true}></InputBase>
                        </Grid>
                        {/*此处有搜索功能*/}
                        <Grid item xs={1}>
                            <Button color={"default"} variant="contained" onClick={()=>search()}>
                                <Search/>
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    {/*这里开始是提交表格，使用Grid来分割*/}
                    <Container maxWidth="sm">
                        <form className={classes.container} noValidate>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    {/*标题*/}
                                    <TextField id="outlined-basic" label="标题" variant="outlined" value={headLine} onChange={(e)=>{setHeadLine(e.target.value)}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    {/*日期选择器*/}
                                    <TextField
                                        id="datetime-local"
                                        label="选择日期"
                                        type="datetime-local"
                                        defaultValue={datetimeLocal}
                                        value={datetimeLocal}
                                        className={classes.textField}
                                        onChange={(e)=>{setDateTimeLocal(e.target.value)}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/*内容*/}
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="在此记录"
                                        multiline
                                        minRows={10}
                                        maxRows={10}
                                        variant="outlined"
                                        fullWidth={true}
                                        value={mainText}
                                        onChange={(e)=>{setMainText(e.target.value)}}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    {/*清除按钮*/}
                                    <Button variant="contained" fullWidth={true} onClick={()=>{setMainText('');setCurruntId('');setHeadLine("");setDateTimeLocal(moment().format("YYYY-MM-DDTHH:mm"))}}>清除</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    {/*提交按钮*/}
                                    <Button variant="contained" fullWidth={true} onClick={()=>submit()} color="primary">提交</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    {/*更新按钮*/}
                                    <Button variant="contained" fullWidth={true} onClick={()=>update()} color="primary">更新</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    {/*删除按钮*/}
                                    <Button variant="contained" fullWidth={true} onClick={()=>deletor()} color="secondary">删除</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* 渲染卡片组 */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title={card.headLine}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.headLine.trim().substring(0,15)+"..."}
                                        </Typography>
                                        <Typography>
                                            {card.mainText.trim().substring(0,15)+"..."}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={()=>{setHeadLine(card.headLine);setMainText(card.mainText);setDateTimeLocal(card.dateTime);setCurruntId(card.id)}}>
                                            <BorderColor></BorderColor>
                                        </Button>
                                        <Button size="small" color="primary" onClick={()=>{setOpen(true);setDiaCard(card);if (diaCard==null){
                                            alert("此项无效");
                                            setDiaCard(false);
                                            return;
                                        }}}>
                                            <ChatBubble></ChatBubble>
                                        </Button>
                                        <Button size="small" color="primary" disabled={true}>
                                            <label color={"black"}>{card.dateTime}</label>
                                        </Button>
                                        <Dialog fullScreen={true} open={open}>
                                                    <div align={"center"}>
                                                        <Button size={"small"} color={"primary"} onClick={()=>{setOpen(false);setDiaCard("")}}>
                                                            <ArrowBack></ArrowBack>
                                                        </Button>
                                                        <h3>{diaCard.headLine}</h3>
                                                        <label>{diaCard.dateTime}</label>
                                                        <p></p>
                                                        <Typography>{diaCard.mainText}</Typography>
                                                    </div>;
                                        </Dialog>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Made By ComradeGenrr
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    This project has beed shared on <Link href={"https://github.com/nsplnpbjy/my-app"}>comradegenrr</Link>
                </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}