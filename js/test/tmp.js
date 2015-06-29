

//滚动参数全局配置

var speedrate = 0.1;
var startfrom = 1;
var f = {};
var pw=$("body").width();//
f.start  = 1;
f.welcome  = f.start ;
f.scroll_tip  = f.welcome + 600;
f.title  = f.welcome + 500;
f.welcome_end  = f.title + 800;

//===============基本信息=============
//f.info            =1000;
f.info            =f.welcome_end+400;
f.bacis_info      =f.info;
f.info_dital      =f.info+110;
f.work_info       =f.info+320;//工作经历
f.work_dital      =f.work_info+200;//工作详细
f.educate_info    =f.info+130;//教育信息
f.educate_dital   =f.educate_info+600;//教育详细
f.hoppy_info      =f.work_info+800;//兴趣爱好
f.hoppy_dital      =f.hoppy_info+400;//兴趣爱好详细
f.skill           =f.hoppy_info+900
f.skill_dital     =f.skill+300
f.info_end        =f.skill+800;

//===============经验介绍=============
//f.exp_info        =f.info_end+1000;

f.exp_info        =f.info_end+300;

//滚动测试
f.scimg=f.exp_info+300;
f.shine_line        =f.scimg+500;
f.exp_title        =f.shine_line+700;

// 线条1
f.le0     =f.exp_title+900
f.le1     =f.le0+300
f.le1_e     =f.le1+300//停顿
f.le2     =f.le1_e+300
f.le2_e     =f.le2+300
f.le3     =f.le2_e+300
f.le3_e     =f.le3+300
f.le4     =f.le3_e+300
f.le4_e     =f.le4+300
f.le5     =f.le4_e+300
f.le5_e     =f.le5+300
//线条2
f.ln0     =f.exp_title+300
f.ln1     =f.ln0+400
f.ln1_e     =f.ln1+300//停顿
f.ln2     =f.ln1_e+400
f.ln2_e     =f.ln2+600
f.ln3     =f.ln2_e+300
f.ln3_e     =f.ln3+400
f.ln4     =f.ln3_e+300
f.ln4_e     =f.ln4+200
f.ln5     =f.ln4_e+400
f.ln5_e     =f.ln5+300
//==============作品介绍=============
f.art=f.ln5_e+300
f.artline   =  f.art+400
f.artinfo   =f.artline+800 
f.artcard   =f.artinfo 
f.artEnd    =f.artcard+1000;

var settings = [];
function get_setting() {
//    settings = [
//    {
//        selector: '#inner-wrapper',
//        frame: [f.exp_info,f.le3,f.le5_e,f.art,f.art],
//        style:{
//            top:  [0,0, -300,-700 ,-1000]
//        }
//    },
        settings = [
        {
            selector: '#inner-wrapper',
            frame: [f.info_dital,f.work_info,f.exp_info,f.le3,f.le5_e,f.art],
                style:{
                    left:[0,0,0],
                    top:  [1,"-200",-1800]
                }
        },
    //welcome====================
        {
            selector: '#welcome',
            frame: [ f.title, f.title+400 ],
            style:{
                opacity:[1,0]
            }
        },
        {
            selector: '#scrolle-tip',
            frame: [ f.scroll_tip, f.welcome_end ],
            style:{
                height:200,
                opacity:[1,0],
                bottom:[100]
            }
        },
        {
            selector: '#title',
            frame: [  f.title, f.welcome_end  ],
            style:{
                opacity:[1,0],
                top:[100]
            }
        },
        //info=================基本信息===============
    {
        selector:"#basic-info",
        frame:[f.info_dital],
        style:{
            height:[340]
        }
    } ,
{
        selector:"#info_dital",
        frame:[f.info_dital]
    } ,
{
        selector:"#educate-info",
        frame:[f.educate_dital],
        style:{
            height:[490]
        }
    } ,
{
        selector:"#educate_dital",
        frame:[f.educate_dital]
    } ,
{
        selector:"#work-info",
        frame:[f.work_dital],
        style:{
            height:[380]
        }
    } ,
{
        selector:"#work_dital",
        frame:[f.work_dital]
    } ,
{
        selector:"#hoppy-info",
        frame:[f.hoppy_info,f.skill],
        style:{
            height: [0, 330],
            width: [0, 195]
        }
    } ,
{
        selector:"#hoppy_dital",
        frame:[f.hoppy_dital]
    } ,
{
        selector:"#skill-info",
        frame:[f.skill],
        style:{
            width: [160, 620]
        }
    } ,
{
        selector:"#skill_dital",
        frame:[f.skill_dital]
    } ,
//{
//        selector:"#tran-line",
//        frame:[f.info_end],
//        style:{
//            width: [0, 1400]
//        }
//    } ,
    //info=================基本信息 结束===============
 
    //====================经历开始=====================
    //滚动
    {
        selector:"#scimg",
        frame:[f.scimg,f.shine_line  ],
        style:{
            left:[160,pw/2-70],
            
            rotate: [0, (pw/2+90)*360/(Math.PI*150)]
        //            width:[6,1400]
        }
    },
    {
        selector:"#shine-line",
        frame:[f.shine_line,f.exp_title ],
        style:{
            width:[6,1400]
        }
    },
    {
        selector:"#exp-title",
        frame:[f.exp_title ]
    },
    {
        selector:"#exp-line1",
        frame:[f.le0,f.le1,f.le1_e,f.le2,f.le2_e,f.le3,f.le3_e,f.le4,f.le4_e,f.le5,f.le5_e],
        style:{
            height:[10,50,50,160,160,270,270,380,380,500,500,800,800]
        }
    },
    {
        selector:"#exp-line2",
        frame:[f.ln0,f.ln1,f.ln1_e,f.ln2,f.ln2_e,f.ln3,f.ln3_e,f.ln4,f.ln4_e,f.ln5,f.ln5_e],
        style:{
            height:[10,52,52,142,142,270,270,380,380,500,500,800,800]
        }
    },
    {
        selector:"#exp-item1",
        frame:[f.le1_e]
    },
    {
        selector:"#exp-item2",
        frame:[f.le2_e]
    },
    {
        selector:"#exp-item3",
        frame:[f.le3_e]
    },
    {
        selector:"#exp-item4",
        frame:[f.le4_e]
    },
    {
        selector:"#exl-item1",
        frame:[f.ln1_e]
    },
    {
        selector:"#exl-item2",
        frame:[f.ln2_e]
    },
    {
        selector:"#exl-item3",
        frame:[f.ln3_e]
    },
    {
        selector:"#exl-item4",
        frame:[f.ln4_e]
    },
    
    
    //===================作品介绍================
   
   {
        selector:"#bone-line",
        frame:[f.artline,f.artinfo  ],
        style:{
            height:[0,700]
        //            width:[6,1400]
        }
    },
   {
        selector:"#art-info",
        frame:[f.artinfo+200],
        style:{
            opacity:[0,1]
        //            width:[6,1400]
        }
    },
   
    //=================move-item====================
    //    {
    //        selector:"#move-item1,#move-item2",
    //        frame:[f.an1,f.an2],
    //        style:{
    //            opacity:[0,1]
    //        }
    //    } ,
    //{
    //        selector:"#move-item1,#move-item2",
    //        frame:[f.an3,f.an4],
    //        style:{
    //            opacity:[1,0]
    //        }
    //    } ,
    //{
    //        selector:"#move-item1",
    //        frame:[f.an2,f.an3],
    //        style:{
    //            top:[500]
    //        }
    //    } ,
    //{
    //        selector:"#move-item2",
    //        frame:[f.an2,f.an3],
    //        style:{
    //            left:[400]
    //        }
    //    },
    //line1==========================,
    //    {
    //        selector:"#line1",
    //        frame:[f.an2,f.an3],
    //        style:{
    //            height:[400]
    //        }
    //    },
    //    {
    //        selector:"#line2",
    //        frame:[f.an2,f.an3],
    //        style:{
    //            width:[300]
    //        }
    //    },
    //===动画==============
    {
        selector:"#holder",
        frame:[f.an3,f.an4]
    }
    ];
}