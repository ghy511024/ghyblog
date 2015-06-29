/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var speedrate = 0.1;
var startfrom = 1;
var f = {};

f.start          = 1,
    f.scrolldown     = 5;
f.logotype       = f.scrolldown + 300;
 
// service ------------------------------------
f.service        = f.scrolldown + 495;
f.digital        = f.service;
f.digital_pop  = f.digital    + 110;
f.activity       = f.digital    + 300;
f.activity_pop = f.activity   + 110;
f.video          = f.activity   +  60;
f.video_pop    = f.video      + 220;
f.internet       = f.video      + 400;
f.internet_pop = f.internet   + 200;
f.media          = f.internet   + 450;
f.media_pop      = f.media      + 110;
  
f.dots_to_team   = f.media_pop  + 500;
  
// team --------------------------------------
f.team           = f.dots_to_team + 600;
f.team_move      = f.team         + 450;

f.light          = f.team_move    + 500;
f.gisele         = f.light        + 500;
f.andy           = f.gisele       + 500;
f.egg            = f.andy         + 500;
f.ian            = f.egg          + 500;

f.wawa           = f.ian          + 500;
f.nicole         = f.wawa         + 500;
f.amy            = f.nicole       + 500;
f.ada            = f.amy          + 500;
f.greg           = f.ada          + 500;
// f.joya           = f.greg         + 500;
// f.sophie         = f.joya         + 500;
f.hayley         = f.greg         + 500;
f.kate           = f.hayley       + 500;
f.wayne          = f.kate         + 500;
f.phoebe         = f.wayne        + 500;
f.shakemaker     = f.phoebe       + 500;
f.catfur         = f.shakemaker   + 500;
f.po             = f.catfur       + 500;
f.sliiice        = f.po           + 500;
f.sliiice_stay   = f.sliiice      + 500;
f.sliiice_rotate = f.sliiice_stay + 500;

// project --------------------------------------
f.project        = f.sliiice_rotate + 500;
f.triangle_head  = f.project        + 500;
f.project_move   = f.project        + 1000;


f.first          = f.project_move   + 300;
f.Enrestec_image   = f.first;
f.rrouge_image   = f.Enrestec_image   + 300;
f.kao_app        = f.rrouge_image   + 300;
f.datemenow      = f.kao_app        + 300;
f.spex_app       = f.datemenow      + 300;
f.spex_activity  = f.spex_app       + 300;
f.edn_fanpage    = f.spex_activity  + 300;
f.dsg_movie      = f.edn_fanpage    + 300;
f.sasa7th        = f.dsg_movie      + 300;

f.lufthansa      = f.sasa7th        + 300;
f.aveda          = f.lufthansa      + 300;
f.vizio          = f.aveda          + 300;
f.bananaboat     = f.vizio          + 300;
  
f.family         = f.bananaboat     + 300;
f.transformers   = f.family         + 300;
f.superrun       = f.transformers   + 300;
f.y2012          = f.superrun       + 300;
f.ot             = f.y2012          + 300;
f.ari            = f.ot             + 300;
f.yahoo_promo    = f.ari            + 300;
f.wretch         = f.yahoo_promo    + 300;
f.green          = f.wretch         + 300;
f.sasa           = f.green          + 300;
f.rrouge         = f.sasa           + 300;
f.esteelauder    = f.rrouge         + 300;
f.y2011          = f.esteelauder    + 300;
f.eighteen       = f.y2011          + 300;
f.friday         = f.eighteen       + 300;
f.yahoo_dm       = f.friday         + 300;
f.yahoo_light    = f.yahoo_dm       + 300;

f.project_end    = f.yahoo_light    + 300;

// contact --------------------------------------
f.contact        = f.project_end    + 100;

f.limit          = f.contact + 100;

var settings = [];
function get_setting() {
    settings = [
    {
        selector: '#inner-wrapper',
        frame: [ f.start, f.internet, f.media, f.team, f.team_move, f.light, f.egg, f.ian, f.sliiice, f.project, f.project_move, f.project_end, f.contact ],
        style: {
            left: [550,     '-200',     '+200',  -800,   -1150,       -1500, '-248*3', '+248',    '-550', '0', '-450',  '-250*350/250*30', '-400'],
            top:  [  0,      -1280,     -1700, ' +60',   '+60',       '+60', '-248*3', '-248',  '-290*13', '-500', '+40', '+42*350/250*30', '+30']
        }
    },
    {
        selector: '#link-service',
        frame: [ f.digital, f.team ]
    },
    {
        selector: '#link-team',
        frame: [ f.team, f.project ]
    },
    {
        selector: '#link-project',
        frame: [ f.project, f.contact ]
    },
    {
        selector: '#link-contact',
        frame: [ f.contact, f.limit ]
    },
    {
        selector: "#logotype",
        frame: [f.scrolldown, f.logotype],
        marginTop: [-50, -300]
    },
    {
        selector: "#scrolldown-wrapper",
        frame: [f.scrolldown, f.logotype],
        marginTop: [100, -50]
    },
    {
        selector: '#scrolldown',
        frame: f.scrolldown,
        height: [30, 200]
    },
    {
        selector: "#digital",
        frame: f.digital,
        height: [160, 340]
    },
    {
        selector: "#digital .pop",
        frame: f.digital_pop,
    },

    {
        selector: "#activity",
        frame: f.activity,
        height: [160, 380]
    },
    {
        selector: "#activity .pop",
        frame: f.activity_pop,
    },

    {
        selector: "#video",
        frame: f.video,
        height: [160, 490]
    },
    {
        selector: "#video .pop",
        frame: f.video_pop,
    },

    {
        selector: "#internet",
        frame: [ f.internet, f.internet_pop ],
        style: {
            height: [0, 330],
            width: [0, 195]
        }
    },
    {
        selector: "#internet .pop",
        frame: f.internet_pop,
    },

    {
        selector: "#media-buying",
        frame: f.media,
        width: [160, 620]
    },
    {
        selector: "#media-buying .pop",
        frame: f.media_pop,
    },
    {
        selector: "#dots-gray",
        frame: f.dots_to_team,
        width: [0, 445]
    },

    {
        selector: "#team",
        frame: f.team,
        left: 1590 + 100
    },
    {
        selector: "#member-light",
        frame: [f.light, f.light + 500]
    },
    {
        selector: "#member-gisele",
        frame: [f.gisele, f.gisele + 500]
    },
    {
        selector: "#member-andy",
        frame: [f.andy, f.andy + 500]
    },
    {
        selector: "#member-egg",
        frame: [f.egg, f.egg + 500]
    },
    {
        selector: "#member-ian",
        frame: [f.ian, f.ian + 500]
    },
    {
        selector: "#member-wawa",
        frame: [f.wawa, f.wawa + 500]
    },
    {
        selector: "#member-nicole",
        frame: [f.nicole, f.nicole + 500]
    },
    {
        selector: "#member-amy",
        frame: [f.amy, f.amy + 500]
    },
    {
        selector: "#member-ada",
        frame: [f.ada, f.ada + 500]
    },
    {
        selector: "#member-greg",
        frame: [f.greg, f.greg + 500]
    },
    // {
    //   selector: "#member-joya",
    //   frame: [f.joya, f.joya + 500]
    // },
    // {
    //   selector: "#member-sophie",
    //   frame: [f.sophie, f.sophie + 500]
    // },
    {
        selector: "#member-hayley",
        frame: [f.hayley, f.hayley + 500]
    },
    {
        selector: "#member-kate",
        frame: [f.kate, f.kate + 500]
    },
    {
        selector: "#member-wayne",
        frame: [f.wayne, f.wayne + 500]
    },
    {
        selector: "#member-phoebe",
        frame: [f.phoebe, f.phoebe + 500]
    },
    {
        selector: "#member-shakemaker",
        frame: [f.shakemaker, f.shakemaker + 500]
    },
    {
        selector: "#member-catfur",
        frame: [f.catfur, f.catfur + 500]
    },
    {
        selector: "#member-po",
        frame: [f.po, f.po + 500]
    },
    {
        selector: "#member-sliiice",
        frame: [f.sliiice, f.sliiice_stay, f.sliiice_stay + (f.sliiice_rotate - f.sliiice_stay)/2, f.sliiice_rotate],
        style: {
            rotate: [0, 0, 45, 90],
            top: [0, 30, '0', 0]
        }
    },
    {
        selector: "#member-sliiice .portrait",
        frame: [ f.sliiice_stay, f.sliiice_stay + (f.sliiice_rotate - f.sliiice_stay)/2],
        rotate: [0, -45]
    },
    {
        selector: "#triangle-head",
        frame: f.project
    },

    // project --------------------------------------

    {
        selector: "#project",
        frame: [f.project, f.first]
    },
    {
        selector: "#project h2",
        frame: f.project
    },
    {
        selector: "#project-Enrestec",
        frame: [f.Enrestec_image, f.Enrestec_image+300],
    },
    {
        selector: "#project-rrouge-image",
        frame: [f.rrouge_image, f.rrouge_image+300],
    },
    {
        selector: "#project-kaoliese",
        frame: [f.kao_app, f.kao_app+300],
    },
    {
        selector: "#project-datemenow",
        frame: [f.datemenow, f.datemenow+300],
    },
    {
        selector: "#project-spex2",
        frame: [f.spex_app, f.spex_app+300],
    },
    {
        selector: "#project-spex",
        frame: [f.spex_activity, f.spex_activity+300],
    },
    {
        selector: "#project-envie",
        frame: [f.edn_fanpage, f.edn_fanpage+300],
    },
    {
        selector: "#project-dsg",
        frame: [f.dsg_movie, f.dsg_movie+300],
    },
    {
        selector: "#project-sasa7th",
        frame: [f.sasa7th, f.sasa7th+300],
    },
    {
        selector: "#project-lufthansa",
        frame: [f.lufthansa, f.lufthansa+300],
    },
    {
        selector: "#project-aveda",
        frame: [f.aveda, f.aveda+300],
    },
    {
        selector: "#project-vizio",
        frame: [f.vizio, f.vizio+300],
    },
    {
        selector: "#project-bananaboat",
        frame: [f.bananaboat, f.bananaboat+300],
    },
    {
        selector: "#project-familymart",
        frame: [f.family, f.family+300],
    },
    {
        selector: "#project-transformers",
        frame: [f.transformers, f.transformers+300],
    },
    {
        selector: "#project-superrun",
        frame: [f.superrun, f.superrun+300],
    },
    {
        selector: "#y2012",
        frame: [f.y2012, f.y2012+300],
    },
    {
        selector: "#project-ot",
        frame: [f.ot, f.ot+300],
    },
    {
        selector: "#project-ari",
        frame: [f.ari, f.ari+300],
    },
    {
        selector: "#project-yahoo-promo",
        frame: [f.yahoo_promo, f.yahoo_promo+300],
    },
    {
        selector: "#project-wretch",
        frame: [f.wretch, f.wretch+300],
    },
    {
        selector: "#project-green",
        frame: [f.green, f.green+300],
    },
    {
        selector: "#project-sasa",
        frame: [f.sasa, f.sasa+300],
    },
    {
        selector: "#project-rrouge",
        frame: [f.rrouge, f.rrouge+300],
    },
    {
        selector: "#project-esteelauder",
        frame: [f.esteelauder, f.esteelauder+300],
    },
    {
        selector: "#y2011",
        frame: [f.y2011, f.y2011+300],
    },
    {
        selector: "#project-eighteen",
        frame: [f.eighteen, f.eighteen+300],
    },
    {
        selector: "#project-friday",
        frame: [f.friday, f.friday+300],
    },
    {
        selector: "#project-yahoo-dm",
        frame: [f.yahoo_dm, f.yahoo_dm+300],
    },
    {
        selector: "#project-yahoo-light",
        frame: [f.yahoo_light, f.yahoo_light+300],
    },
    {
        selector: "#contact-innerwrapper",
        frame: [f.project_end-300, f.project_end]
    }
    ];
}