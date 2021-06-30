import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import allSettled from "promise.allsettled";

allSettled.shim();
TimeAgo.addLocale(en);
