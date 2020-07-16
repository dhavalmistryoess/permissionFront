(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){factory(require('jquery'))}else{factory(jQuery)}})(function($){var methods;methods={init:function(options){return this.each(function(){var uuid=_generateUid();var original=$(this);var input;if(original.hasClass('inputpicker-original')&&_getInputpickerDiv(_i(original))){var orginial_css=original.data('inputpicker-original-css');_getInputpickerDiv(_i(original)).closest('.inputpicker-overflow-hidden').remove();original.removeClass(function(index,className){return(className.match(/\binputpicker-\S+/g)||[]).join(' ')});original.css({top:orginial_css.top,position:orginial_css.position})}
{original.data('inputpicker-uuid',uuid);var ow=original.outerWidth();var input=original.clone();input.val('').data('inputpicker-uuid',uuid).addClass('inputpicker-input').prop('id','inputpicker-'+uuid).prop('name','inputpicker-'+uuid);var inputpicker_div=$("<div id=\"inputpicker-div-"+uuid+"\" class=\"inputpicker-div\" data-uuid=\""+uuid+"\" style=\"position:relative;overflow:auto;height:100%;\"><span class=\"inputpicker-arrow\" data-uuid=\""+uuid+"\" onclick=\"$(this).parent().find('input').inputpicker('toggle');event.stopPropagation();\"><b></b></span></div>").append(input).on('click',function(e){$(this).find('input').focus();e.stopPropagation();e.preventDefault()}).attr('unselectable','on').css('user-select','none').on('selectstart',!1);inputpicker_div.css('width',ow+'px');var div_overflow_hidden=$("<div class=\"inputpicker-overflow-hidden\" style='overflow: hidden;'></div>");original.after(div_overflow_hidden.append(inputpicker_div));original.addClass('inputpicker-original').addClass('inputpicker-original-'+uuid).attr('tabindex',-1).data('inputpicker-input',input).data('inputpicker-original-css',{'top':original.css('top'),'position':original.css('position')}).css({'position':'fixed','top':'-1000px'});input.data('inputpicker-original',original).prop('autocomplete','off');$.fn.inputpicker.elements.push(input);original.on('focus.inputpicker',function(){var original=$(this);var input=_i(original);input.trigger('focus')}).on('change.inputpicker',function(){var original=$(this);var input=_i(original);_setValue(input,original.val())});input.on('focus.inputpicker',_eventFocus).on('blur.inputpicker',_eventBlur).on('keydown.inputpicker',_eventKeyDown).on('keyup.inputpicker',_eventKeyUp)}
var _options=[];for(var k in $.fn.inputpicker.defaults){if(input.data(k)){_options[k]=input.data(k)}}
var settings=$.extend({cache:{}},$.fn.inputpicker.defaults,_options,Array.isArray(options)?{data:options}:options);if(!settings.fieldText)settings.fieldText=settings.fieldValue;if(!settings.fields.length){settings.fields.push(settings.fieldText)}
_set(input,settings);_init(input);_loadData(input,settings.data,function(input){if(!_setValue(input,original.val())){}});_initPP()})},loadData:function(data,func){return this.each(function(){var input=_i($(this));_loadData.call(input,input,data,function(input,data){if(_setValue(input,_o(input).val())){_o(input).trigger('change')}
else{}
if(typeof func=='function'){func.call(input,input,data)}})})},destroy:function(options){return this.each(function(){var original=_o($(this));var input=_i(original);var wrapped_list=_getWrappedList(input);var uuid=_uuid(input);input.removeClass('inputpicker-input');input.removeData('inputpicker-settings');input.remove();wrapped_list.remove();var original_css=original.data('inputpicker-original-css');original.css('top',original_css.top).css('position',original_css.position);original.removeData('inputpicker-original-css');original.prop('tabindex',null);original.removeClass('inputpicker-original-'+uuid);original.off('focus.inputpicker');original.off('change.inputpicker')})},set:function(k,v){var input=_i($(this));if(typeof k=='undefined'&&typeof v=='undefined'){return _set(input)}
if(typeof v=='undefined'){return _set(input,k)}
else{return _set(input,k,v)}},data:function(data){if(typeof data=='undefined'){return _set(_i($(this)),'data')}
else{return this.each(function(){var input=_i($(this));_set(input,'data',_formatData(_set(input,'fieldValue'),data))})}},element:function(value,field){var original=_o($(this));var input=_i(original);if(typeof value=='undefined'){value=original.val()}
var fieldValue=(typeof field==='undefined')?_set(input,'fieldValue'):field;var data=_set(input,'data');if(!data.length)return null;var index_i=-1;for(var i=0;i<data.length;i++){if(data[i][fieldValue]==value){return data[i]}}
return null},toggle:function(e){return this.each(function(){var input=_i($(this));if(_isWrappedListVisible(input)){methods.hide.call(input,e);dd('_isWrappedListVisible, so methods.hide.call')}
else{if(input.is(":focus")){methods.show.call(input,e);dd('input.is focus')}
else{dd('input.focus');input.focus();if(!_set(input,'autoOpen')){methods.show.call(input,e)}}}})},show:function(e){return this.each(function(){var input=_i($(this));var uuid=_uuid(input);if(!_isInputVisible(input)){_alert('input[name='+_name(input)+'] is not visible.');return}
else if(_uuid(_getWrappedList())==uuid){dd('_getWrappedList().show()');_getWrappedList().show()}
else{dd('_render');_getWrappedList(input).show();_dataRender(input)}})},hide:function(e){_hideWrappedList()},val:function(value){return this.each(function(){var original=_o($(this));var input=_i(original);if(_setValue(input,value)){original.trigger('change')}
else{}})},is:function(){var input=_i($(this));dd(input)},removeValue:function(v){return this.each(function(){var original=_o($(this));var input=_i(original);var value=_o(input).val();var delimiter=_set(input,'delimiter');var arr_value=value?value.toString().split(delimiter):[];var i=_inArray(v,arr_value);if(i>-1)
{arr_value.splice(i,1);_setValue(input,arr_value.join(delimiter));_hideWrappedList(!0)}})},jumpToPage:function(page){return this.each(function(){var original=_o($(this));var input=_i(original);var value=_o(input).val();_set(input,'pageCurrent',page?parseInt(page):1);_loadData.call(input,input,null,function(input,data){_dataRender(input)})})},debug:!0};function dd(){if(methods.debug){var args=Array.prototype.slice.call(arguments);console.log(args.length==1?args[0]:args)}}
function _name(input){return _o(input).attr('name')}
function _error(msg,input){if(typeof input!='undefined'){var original=_o(input);if(original){if(original.attr('name')){msg+=" for input[name="+original.attr('name')+"]"}
else if(original.attr('id')){msg+=" for input[id="+original.attr('id')+"]"}}}
throw msg+" in inputpicker.js"}
function _alert(msg,input){if(typeof input!='undefined'){if(_name(input)){msg+=' input[name='+_name(input)+']'}}
alert(msg)}
function _formatData(fieldValue,data){if(!Array.isArray(data)){return[]}
if(data.length&&typeof data[0]!='object'){var new_data=[];for(var i in data){var o={};o[fieldValue]=data[i];new_data.push(o)}
data=new_data;new_data=null}
return data}
function _execJSON(input,param,func){var url=_set(input,'url');if(typeof param=='undefined'&&typeof func=='undefined'){_alert('The param is incorrect. input[name='+_name(input)+']');return}
if(typeof func=='undefined'&&typeof param=='function'){func=param;param={}}
if(typeof func!='function'){_alert('The callback function is incorrect. input[name='+_name(input)+']');return}
if(_pagination(input)){param[_set(input,'pageField')]=_set(input,'pageCurrent');param[_set(input,'pageLimitField')]=_set(input,'limit')?_set(input,'limit'):10}
param=$.extend({q:input.val(),limit:_set(input,'limit'),fieldValue:_set(input,'fieldValue'),fieldText:_set(input,'fieldText'),value:_o(input).val()},_set(input,'urlParam'),param);var param_serialised='urlParams|'+$.param(param);var cacheData=_cache(input,param_serialised);if(_set(input,'urlCache')){if(typeof cacheData=='undefined'){dd('Set cache:'+_name(input));$.get(url,param,function(ret){_cache(input,param_serialised,ret);func(ret)},"json")}
else{func(cacheData);dd('Use cache')}}
else{dd('Not use cache');$.get(url,param,func,"json")}}
function _init(input){if(_typeIsMultiple(input)){_initMultiple(input)}
else if(_typeIsTag(input)){_initTag(input)}
if(_set(input,'responsive')){var inputpicker_div=_getInputpickerDiv(input);inputpicker_div.css('width',_set(input,'width'));$(window).bind('resize',function(){_setWrappedListWidthAndHeight(input);_setWrappedListPosition(input)})}}
function _initPP(){$('[data-toggle="popover"]').popover()}
function _initMultiple(input){var inputpicker_div=_getInputpickerDiv(input);if(!inputpicker_div.find('.inputpicker-multiple').length){var inputpicker_multiple_div=$("<div class=\"inputpicker-multiple\" style=\"\"><ul class=\"\">"+"</ul></div>").prependTo(inputpicker_div);inputpicker_div.attr('class',inputpicker_div.attr('class')+' '+input.attr('class')).css('border',input.css('border')).addClass('inputpicker-multiple').css('left','0px').append("<span class=\"input-span\" style=\"display: none;\" ></span>");input.removeClass().width(1).on('keyup.inputpicker.multiple',function(e){var input=$(this);var inputpicker_div=_getInputpickerDiv(input);var span=inputpicker_div.find('.input-span');span.text(input.val());input.width(span.width()+15);_setWrappedListPosition(input)});input.detach().appendTo($("<li class=\"inputpicker-multiple-input\"></li>").appendTo(inputpicker_multiple_div.find('ul')))}}
function _initTag(input){var inputpicker_div=_getInputpickerDiv(input);if(!inputpicker_div.find('.inputpicker-multiple').length){var inputpicker_multiple_div=$("<div class=\"inputpicker-multiple\" style=\"\"><ul class=\"\"></ul></div>").prependTo(inputpicker_div);inputpicker_div.attr('class',inputpicker_div.attr('class')+' '+input.attr('class')).css('border',input.css('border')).addClass('inputpicker-multiple').css('left','0px').append("<span class=\"input-span\" style=\"display: none;\" ></span>");input.removeClass().width(1).on('keyup.inputpicker.multiple',function(e){var input=$(this);var inputpicker_div=_getInputpickerDiv(input);var span=inputpicker_div.find('.input-span');span.text(input.val());input.width(span.width()+15);_setWrappedListPosition(input)});input.detach().appendTo($("<li class=\"inputpicker-multiple-input\"></li>").appendTo(inputpicker_multiple_div.find('ul')))}}
function _getInputpickerDiv(input){return _i(input).closest('.inputpicker-div')}
function _getInputMultipleElements(input){var p='.inputpicker-element';return _getInputpickerDiv(input).find(p)}
function _getWrappedList(input){var wrapped_list=$('#inputpicker-wrapped-list');if(!wrapped_list.length){wrapped_list=$('<div />',{id:'inputpicker-wrapped-list',tabindex:-1}).css({'display':'none','position':'absolute','overflow':'auto'}).addClass('inputpicker-wrapped-list').data('inputpicker-uuid',0).appendTo(document.body).popover();$(document).on('click',function(e){if(!($(e.target).hasClass('inputpicker-input'))){_hideWrappedList()}});wrapped_list.on('click',function(e){e.preventDefault();e.stopPropagation()})}
if(typeof input!='undefined'){if(_uuid(wrapped_list)!=_uuid(input)){_uuid(wrapped_list.html(""),_uuid(input))}}
return wrapped_list}
function _setWrappedListWidthAndHeight(input){var inputpicker_div=_getInputpickerDiv(input);var wrapped_list=_getWrappedList();var setWidth=_set(input,'width');var width,height;if(setWidth.substr(-1)=='%'){var p=parseInt(setWidth.slice(0,-1));width=parseInt(p*inputpicker_div.outerWidth()/100)}
else{width=setWidth?setWidth:inputpicker_div.outerWidth()}
height=_set(input,'height');wrapped_list.css({width:width,maxHeight:height,overflowY:'auto'})}
function _setWrappedListPosition(input){var inputpicker_div=_getInputpickerDiv(input);var left=inputpicker_div.offset().left,top=inputpicker_div.offset().top+inputpicker_div.outerHeight();_getWrappedList(input).css({left:inputpicker_div.offset().left+'px',top:(inputpicker_div.offset().top+inputpicker_div.outerHeight())+'px'})}
function _changeWrappedListSelected(input,offset){var wrapped_list=_getWrappedList();var wrapped_elements=_getWrappedListElements();if(_isWrappedListVisible(input)&&wrapped_elements.length){if(wrapped_elements.length&&_getWrappedListElements(!0).length==0){wrapped_elements.first().addClass('inputpicker-active')}
else{var tr_active=_getWrappedListElements(!0);if(offset){if(offset<0&&tr_active.prev().length){tr_active.removeClass('inputpicker-active').prev().addClass('inputpicker-active');if(tr_active.prev().position().top<tr_active.outerHeight()){wrapped_list.scrollTop(wrapped_list.scrollTop()-tr_active.outerHeight())}}
else if(offset>0&&tr_active.next().length){tr_active.removeClass('inputpicker-active').next().addClass('inputpicker-active');if((tr_active.next().position().top+2*tr_active.outerHeight())>wrapped_list.outerHeight()){wrapped_list.scrollTop(wrapped_list.scrollTop()+tr_active.outerHeight())}}}}}}
function _o(input){return input.data('inputpicker-original')?input.data('inputpicker-original'):input}
function _i(original){return original.data('inputpicker-input')?original.data('inputpicker-input'):original}
function _uuid(o,uuid){return typeof uuid=='undefined'?o.data('inputpicker-uuid'):o.data('inputpicker-uuid',uuid)}
function _cache(input,name,value){var settings=input.data('inputpicker-settings');if(typeof value=='undefined'){if(typeof name=='undefined'){return settings.cache}
else if(typeof name=='object'){settings.cache=name;input.data('inputpicker-settings',settings)}
else{return settings.cache[name]}}
else{settings.cache[name]=value;input.data('inputpicker-settings',settings);return input}}
function _type(input){var t='';if(_set(input,'multiple')){t='multiple'}
else if(_set(input,'tag')){t='tag'}
return t}
function _typeIsMultiple(input){return'multiple'===_type(input)}
function _typeIsTag(input){return'tag'===_type(input)}
function _pagination(input){var t='';if(_set(input,'pagination')){t=_set(input,'pageMode');if(t!='scroll')t='tradition'}
return t}
function _isCreatable(input){return _set(input,'creatable')}
function _selectMode(input){return _set(input,'selectMode')}
function _selectModeIsRestore(input){return _set(input,'selectMode')=='restore'}
function _selectModeIsActive(input){return _set(input,'selectMode')=='active'}
function _selectModeIsCreatable(input){return _set(input,'selectMode')=='creatable'}
function _selectModeIsEmpty(input){return _set(input,'selectMode')=='empty'}
function _inputValueEqualToOriginalValue(input){dd("_inputValueEqualToOriginalValue: _i("+_i(input).val()+") == _o("+_o(input).val()+")");return _i(input).data('value')==_o(input).val()}
function _set(input,name,value){var settings=input.data('inputpicker-settings');if(typeof value=='undefined'){if(typeof name=='undefined'){return settings}
else if(typeof name=='object'){input.data('inputpicker-settings',name)}
else{return settings[name]}}
else{settings[name]=value;input.data('inputpicker-settings',settings);return input}}
function _filterData(input){var fields=_set(input,'fields');var fieldValue=_set(input,'fieldValue');var filterType=_set(input,'filterType');var filterField=_set(input,'filterField');var data=_formatData(fieldValue,methods.data.call(input));var input_value=input.val();var input_value_low=input_value.toString().toLowerCase();if(!_set(input,'filterOpen')||!input_value_low||_set(input,'url')||!_isArray(data)){return data}
var new_data=[];var isShown;for(var i=0;i<data.length;i++){isShown=!1;if(typeof filterField=='string'&&filterField)
{if(typeof data[i][filterField]=='undefined'){continue}
var fieldValue=data[i][filterField].toString().toLowerCase();if(filterType=='start'&&fieldValue.substr(0,input_value_low.length)==input_value_low){isShown=!0}
else if(fieldValue.indexOf(input_value_low)!=-1){isShown=!0}}
else{if(typeof filterField!='array'&&typeof filterField!='object'){filterField=[];for(var k in fields)filterField.push(typeof fields[k]=='object'?fields[k].name:fields[k]);}
for(var k in filterField){if(typeof data[i][filterField[k]]=='undefined'){continue}
var fieldValue=(data[i][filterField[k]])?data[i][filterField[k]].toString().toLowerCase():"";if(filterType=='start'&&fieldValue.substr(0,input_value_low.length)==input_value_low){isShown=!0}
else if(fieldValue.indexOf(input_value_low)!=-1){isShown=!0}}}
if(isShown)new_data.push(data[i])}
return new_data}
function _dataRender(input){if(_typeIsMultiple(input)){_dataRenderMultiple(input)}
else if(_typeIsTag(input)){_dataRenderTag(input)}
else{_dataRenderDefault(input)}}
function _renderCss(input){var output="";var tmp,tmp1,tmp2;var wrapped_list=_getWrappedList(input);output+="<style>";if(tmp=_set(input,'listBackgroundColor')){wrapped_list.css('backgroundColor',tmp)}
if(tmp=_set(input,'listBorderColor')){wrapped_list.css('borderColor',tmp)}
tmp1=_set(input,'rowSelectedBackgroundColor');tmp2=_set(input,'rowSelectedFontColor')
if(tmp1||tmp2){output+=".inputpicker-wrapped-list .inputpicker-active{ ";if(tmp1)output+="background-color: "+tmp1+"; ";if(tmp2)output+="color: "+tmp2+"; ";output+="}"}
output+="</style>";return output}
function _renderTableHeader(input){var output="";var fields=_set(input,'fields');if(_set(input,'headShow')){output+='<thead><tr>';for(var i=0;i<fields.length;i++){var text='';if(typeof fields[i]=='object'){text=fields[i].text?fields[i].text:fields[i].name}
else{text=fields[i]}
output+='<th>'+text+'</th>'}
output+='</thead>'}
return output}
function _renderPaginationFooter(input){var fields=_set(input,'fields');var output="";if(fields.length>0&&_pagination(input)){var fields=_set(input,'fields');output+='<tfoot class="inputpicker-pagination"><tr><td align="right" colspan="'+fields.length+'">';output+="<div style=\"width:100%;\">";var count=_set(input,'pageCount')?parseInt(_set(input,'pageCount')):0;var current_page=_set(input,'pageCurrent')?parseInt(_set(input,'pageCurrent')):1;var limit=_set(input,'limit')?parseInt(_set(input,'limit')):10;var last_page=Math.ceil(count/limit);var prev_page=current_page>1?(current_page-1):1;var next_page=current_page<last_page?(current_page+1):last_page;output+="<div style=\"float:left;padding-left:5px;\">There are "+count+" results.</div>";output+="<div style=\"float:right;padding-right:5px;\">"+"<a href=\"javascript:void(0);\" onclick=\"$('#inputpicker-"+_uuid(input)+"').inputpicker('jumpToPage', '1');\">First</a>"+"<a href=\"javascript:void(0);\" onclick=\"$('#inputpicker-"+_uuid(input)+"').inputpicker('jumpToPage', '"+prev_page+"');\">Prev</a>"+"<span class=\"current-page\">"+current_page+"</span>"+"<a href=\"javascript:void(0);\" onclick=\"$('#inputpicker-"+_uuid(input)+"').inputpicker('jumpToPage', '"+next_page+"');\">Next</a>"+"<a href=\"javascript:void(0);\" onclick=\"$('#inputpicker-"+_uuid(input)+"').inputpicker('jumpToPage', '"+last_page+"');\">Last</a>"+"</div>";output+="</div></div>";output+='</td></tr></tfoot>'}
return output}
function _dataRenderTag(input){var wrapped_list=_getWrappedList(input);_set(input,'headShow',!1);_dataRenderMultiple(input);dd('inputpicker-no-result',wrapped_list.find('.inputpicker-no-result').length)}
function _dataRenderMultiple(input){var inputpicker_div=_getInputpickerDiv(input);var wrapped_list=_getWrappedList(input);var uuid=_uuid(input);var data=_filterData(input);var fields=_set(input,'fields');var fieldValue=_set(input,'fieldValue');var filterOpen=_set(input,'filterOpen');var filterType=_set(input,'filterType');var filterField=_set(input,'filterField');var delimiter=_set(input,'delimiter');var value=_o(input).val();var arr_value=value.toString().split(delimiter);var output="";wrapped_list.show().data('inputpicker-uuid',uuid).html('');_setWrappedListWidthAndHeight(input);_setWrappedListPosition(input);output+=_renderCss(input);output+="<table class=\"table table-bordered \">";output+=_renderTableHeader(input);if(data.length){output+="<tbody>";var isSelected=!1;for(var i=0;i<data.length;i++){isSelected=-1<_inArray(data[i][fieldValue],arr_value);output+='<tr class="inputpicker-element inputpicker-element-'+i+' '+(isSelected?'inputpicker-selected':'')+' " data-i="'+i+'" data-value="'+data[i][fieldValue]+'">';for(var j=0;j<fields.length;j++){var k=(typeof fields[j]=='object')?fields[j].name:fields[j];var text=typeof data[i][k]!='undefined'?data[i][k]:'';if(!text){text='&nbsp;'}
output+='<td';var html_style="";var custom_style="";if(_isObject(fields[j])){if(fields[j].width){html_style+="width:"+fields[j].width}
if(fields[j].col_custom){html_style+=" "+fields[j].col_custom}}
output+=' style="'+html_style+'" ';output+='>'+text+'</td>'}
output+='</tr>'}
output+="</tbody>"}
else{output+="<thead><tr><td colspan='"+fields.length+"' align='center' class=\"inputpicker-no-result\">No results.</td></thead></tr>"}
output+="</table>";wrapped_list.append($(output));wrapped_list.find('tbody').find('tr').each(function(){var that=$(this);that.on('mouseover',function(e){wrapped_list.find('.inputpicker-element').each(function(){$(this).removeClass('inputpicker-active')});that.addClass('inputpicker-active')}).on('click',function(e){var self=$(this);var uuid=$('#inputpicker-wrapped-list').data('inputpicker-uuid');var input=$('#inputpicker-'+uuid);var selected=self.hasClass('inputpicker-selected');var delimiter=_set(input,'delimiter');var value=_o(input).val();var arr_value=value?value.toString().split(delimiter):[];var i=_inArray(self.data('value'),arr_value);if(selected&&i>-1)
{arr_value.splice(i,1);self.removeClass('inputpicker-selected')}
else if(!selected){arr_value.push(self.data('value'));self.addClass('inputpicker-selected')}
_setValue(input,arr_value.join(delimiter));self.removeClass('inputpicker-active');input.val('');input.data('value','');if(!_isMSIE()){input.focus()}
_hideWrappedList()})})}
function _dataRenderDefault(input){var inputpicker_div=_getInputpickerDiv(input);var wrapped_list=_getWrappedList(input);var uuid=_uuid(input);var data=_filterData(input);var popover=_set(input,'popover');var fields=_set(input,'fields');var fieldValue=_set(input,'fieldValue');var filterOpen=_set(input,'filterOpen');var filterType=_set(input,'filterType');var filterField=_set(input,'filterField');var highlightResult=_set(input,'highlightResult');var value=_o(input).val();var input_keyword_low=_i(input).val().toString().toLowerCase();var output="";wrapped_list.show().data('inputpicker-uuid',uuid).html('');_setWrappedListWidthAndHeight(input);_setWrappedListPosition(input);output+=_renderCss(input);output+="<table class=\"table small table-bordered \">";output+=_renderTableHeader(input);if(data.length){output+="<tbody>";for(var i=0;i<data.length;i++){var tr_highlight=!1;var output_tds="";for(var j=0;j<fields.length;j++){var k=(typeof fields[j]=='object')?fields[j].name:fields[j];var text=typeof data[i][k]!='undefined'?data[i][k]:'';if(text){if(value&&text.toString().toLowerCase().indexOf(input_keyword_low)!=-1){tr_highlight=!0}}
if(!text){text='&nbsp;'}
output_tds+='<td';var html_style="";if(_isObject(fields[j])){if(fields[j].width){html_style+="width:"+fields[j].width}
if(fields[j].col_custom){html_style+=" "+fields[j].col_custom}}
output_tds+=' style="'+html_style+'" ';output_tds+='>'+text+'</td>'}
var tr_class='inputpicker-element inputpicker-element-'+i;if(tr_highlight&&highlightResult){tr_class+=" inputpicker-highlight-active"}
if(value==data[i][fieldValue]){tr_class+=" inputpicker-active"}
var ppover="";if(typeof popover!='undefined'){ppover='data-toggle="popover" data-container="body" data-placement="top" data-trigger="hover" data-content="'+data[i][fieldValue]+'"'}
output+='<tr '+ppover+' d class=" '+tr_class+'" data-i="'+i+'" data-value="'+data[i][fieldValue]+'">';output+=output_tds;output+='</tr>'}
output+="</tbody>"}
else{output+="<thead><tr><td colspan='"+fields.length+"' align='center'>No results.</td></thead></tr>"}
output+=_renderPaginationFooter(input);output+="</table>";wrapped_list.append($(output));wrapped_list.find('tbody').find('tr').each(function(){var that=$(this);that.on('mouseover',function(e){wrapped_list.find('.inputpicker-element').each(function(){$(this).removeClass('inputpicker-active')});that.addClass('inputpicker-active')}).on('click',function(e){var uuid=$('#inputpicker-wrapped-list').data('inputpicker-uuid');var input=$('#inputpicker-'+uuid);var data=_set(input,'data');_setValue(input,$(this).data('value'));_o(input).trigger('change');if(!_isMSIE()){input.focus()}
_hideWrappedList()})});var tr_active=_getWrappedListElements(!0);if(tr_active.length&&((tr_active.position().top+2*tr_active.outerHeight())>wrapped_list.outerHeight())){wrapped_list.scrollTop(wrapped_list.scrollTop()+tr_active.data('i')*tr_active.outerHeight())}}
function _matchActiveInRender(input){var wrapped_list=_getWrappedList(input);var fields=_set(input,'fields');var fieldValue=_set(input,'fieldValue');var filterType=_set(input,'filterType');var filterField=_set(input,'filterField');var data=_formatData(fieldValue,methods.data.call(input));var input_value=input.val();var input_value_low=input_value.toString().toLowerCase();var tr_active=_getWrappedListElements(!0);if(!input_value_low){return}
if(_uuid(wrapped_list)!=_uuid(input)){return}
var shouldBeActive=!1;if(tr_active.length){var i=tr_active.data('i');shouldBeActive=!1;for(var j=0;j<fields.length;j++){var field_name=(typeof fields[j]=='object')?fields[j].name:fields[j];if(typeof data[i][field_name]=='undefined'){continue}
var fieldValue=data[i][field_name].toString().toLowerCase();if(fieldValue.substr(0,input_value_low.length)==input_value_low){shouldBeActive=!0;break}}
if(shouldBeActive){return}}
var tr_new_active=null;var elements=_getWrappedListElements();for(var x=0;x<elements.length;x++){var i=$(elements[x]).data('i');for(var j=0;j<fields.length;j++){var field_name=(typeof fields[j]=='object')?fields[j].name:fields[j];if(typeof data[i][field_name]=='undefined'){continue}
var fieldValue=(data[i][field_name])?data[i][field_name].toString().toLowerCase():data[i][field_name];if(fieldValue.substr(0,input_value_low.length)==input_value_low){tr_new_active=elements[x];break}}
if(tr_new_active){if(tr_active.length){tr_active.removeClass('inputpicker-active')}
$(tr_new_active).addClass('inputpicker-active');tr_active=$(tr_new_active);if(tr_active.position().top<tr_active.outerHeight()){wrapped_list.scrollTop(tr_active.position().top)}
else if((tr_active.position().top+2*tr_active.outerHeight())>wrapped_list.outerHeight()){wrapped_list.scrollTop(wrapped_list.scrollTop()+tr_active.data('i')*tr_active.outerHeight())}
return}}}
function _matchHighlightInRender(input){var highlightResult=_set(input,'highlightResult');if(!highlightResult)return;var wrapped_list=_getWrappedList(input);var fields=_set(input,'fields');var fieldValue=_set(input,'fieldValue');var filterType=_set(input,'filterType');var filterField=_set(input,'filterField');var data=_formatData(fieldValue,methods.data.call(input));var input_value=input.val();var input_keyword_low=input_value.toString().toLowerCase();var tr_active=_getWrappedListElements(!0);var elements=_getWrappedListElements();elements.removeClass('inputpicker-highlight-active');if(!input_keyword_low)return;for(var x=0;x<elements.length;x++){var i=$(elements[x]).data('i');var inputpick_highlight_active=!1;for(var j=0;j<fields.length;j++){var field_name=(typeof fields[j]=='object')?fields[j].name:fields[j];if(typeof data[i][field_name]=='undefined'){continue}
var fieldValue=data[i][field_name].toString().toLowerCase();if(fieldValue&&fieldValue.indexOf(input_keyword_low)!=-1){inputpick_highlight_active=!0}}
if(inputpick_highlight_active){$(elements[x]).addClass('inputpicker-highlight-active')}}}
function _isInputVisible(os){var o=os[0];return o.offsetWidth>0&&o.offsetHeight>0}
function _isInputWriteable(input){return!input.prop('readonly')}
function _loadData(input,data,func){var original=_o(input);if(typeof func=='undefined'&&typeof data=='undefined'){return!1}
if(typeof func=='undefined'&&typeof data=='function'){func=data;data=null}
input.addClass('loading').prop('disabled',!0);if(_isMSIE())input.addClass('loading-msie-patch');if(_set(input,'url')){var param={};if(_isObject(data)&&data){param=data}
_execJSON(input,param,function(ret){var data;if(_pagination(input)){_set(input,'pageCount',ret[_set(input,'pageCountField')])}
if(_isArray(ret)){data=ret}
else{data=ret.data}
if(!_isArray(data)){_alert("The type of data("+(typeof data)+") is incorrect.",input);data=_set(input,'data')}else{methods.data.call(input,data)}
input.removeClass('loading').prop('disabled',!1);if(_isMSIE())input.removeClass('loading-msie-patch');if(typeof func=='function'){func.call(this,input,data)}})}
else{if(_isArray(data)){methods.data.call(input,data)}
else{data=_set(input,'data')}
if(typeof func=='function'){func.call(this,input,data)}
input.removeClass('loading').prop('disabled',!1);if(_isMSIE())input.removeClass('loading-msie-patch')}}
function _setValue(input,value){if(_typeIsMultiple(input)){return _setValueForMultiple(input,value)}
else if(_typeIsTag(input)){return _setValueForTag(input,value)}
else{var original=_o(input);var old_original_value=original.val();var fieldValue=_set(input,'fieldValue');var fieldText=_set(input,'fieldText');var data=_set(input,'data');if(!data.length)return!1;var index_i=-1;for(var i=0;i<data.length;i++){if(data[i][fieldValue]==value){index_i=i}}
if(index_i==-1){if(_selectModeIsCreatable(input)){input.val(value);original.val(value)}
else if(_selectModeIsEmpty(input)){dd("res: index_i == -1 and empty, fieldValue:"+fieldValue+"; value: "+value);dd(data);input.val('');input.data('value','');original.val('');value=''}
else{if(value){index_i=0;value=data[index_i][fieldValue]}
else{input.val('');input.data('value','');original.val('')}}}
if(index_i>-1){input.val(data[index_i][fieldText]);input.data('value',data[index_i][fieldValue]);original.val(data[index_i][fieldValue])}
return old_original_value!=value}}
function _setValueForTag(input,value){return _setValueForMultiple(input,value)}
function _setValueForMultiple(input,value){var original=_o(input);var old_original_value=original.val();var fieldValue=_set(input,'fieldValue');var fieldText=_set(input,'fieldText');var delimiter=_set(input,'delimiter');var data=_set(input,'data');if(!data.length)return!1;var arr_values=value?value.toString().split(delimiter):[];var new_values=[];var new_data=[];for(var i=0;i<data.length;i++){if(-1<_inArray(data[i][fieldValue],arr_values)){new_values.push(data[i][fieldValue]);new_data.push(data[i])}}
var o_v=old_original_value,n_v=new_values.sort().join(delimiter);new_values=new_values.join(delimiter);original.val(new_values);var ul_multiple=_getInputpickerDiv(input).find('.inputpicker-multiple').find('ul');ul_multiple.find("li.inputpicker-element").remove();var li_input=input.closest('li');for(var i=0;i<new_data.length;i++){var d=new_data[i];$("<li class=\"inputpicker-element\" data-value=\""+d[fieldValue]+"\"><span>"+d[fieldText]+"</span> <a href=\"javascript:void(0);\" onclick=\"$(this).closest('.inputpicker-div').find('input').inputpicker('removeValue', $(this).parent().data('value') );event.stopPropagation();\" onmouseover=\"$(this).prev().addClass();\" tabindex='-1'>x</a></li>").insertBefore(li_input)}
return o_v!=n_v}
function _setValueByActive(input){if(_typeIsMultiple(input)){return _setValueByActiveForMultiple(input)}
else if(_typeIsTag(input)){return _setValueByActiveForMultiple(input)}
else{var wrapped_list=_getWrappedList();var tr_active=_getWrappedListElements(!0);if(_uuid(wrapped_list)!=_uuid(input)){return!1}
if(tr_active.length){return _setValue(input,tr_active.data('value'))}
else{return!1}}}
function _setValueByActiveForMultiple(input){var wrapped_list=_getWrappedList();var tr_active=_getWrappedListElements(!0);if(_uuid(wrapped_list)!=_uuid(input)){return!1}
if(tr_active.length){var self=tr_active;var delimiter=_set(input,'delimiter');var value=_o(input).val();var arr_value=value?value.toString().split(delimiter):[];var selected=self.hasClass('inputpicker-selected');var i=_inArray(self.data('value'),arr_value);if(selected&&i>-1)
{arr_value.splice(i,1);self.removeClass('inputpicker-selected')}
else if(!selected){arr_value.push(self.data('value'));self.addClass('inputpicker-selected')}
tr_active.removeClass('inputpicker-active');return _setValue(input,arr_value.join(delimiter))}
else{return!1}}
function _isWrappedListVisible(input){var wrapped_list=_getWrappedList();if(wrapped_list.is(':visible')&&_uuid(wrapped_list)==_uuid(input)){return!0}
else{return!1}}
function _hideWrappedList(ifReset){var wrapped_list=_getWrappedList();if(typeof ifReset!='undefined'&&ifReset){_uuid(wrapped_list,0)}
return wrapped_list?wrapped_list.hide():!1}
function _getWrappedListElements(isActive){var p='.inputpicker-element';if(typeof isActive!='undefined'){p+=isActive?'.inputpicker-active':':not(.inputpicker-active)'}
return _getWrappedList().find(p)}
function _generateUid(){if(!window.inputpickerUUID)window.inputpickerUUID=0;return++window.inputpickerUUID}
function _isMSIE()
{var iev=0;var ieold=(/MSIE (\d+\.\d+);/.test(navigator.userAgent));var trident=!!navigator.userAgent.match(/Trident\/7.0/);var rv=navigator.userAgent.indexOf("rv:11.0");if(ieold)iev=new Number(RegExp.$1);if(navigator.appVersion.indexOf("MSIE 10")!=-1)iev=10;if(trident&&rv!=-1)iev=11;return iev}
function _setValueForInput(input){if(_selectModeIsActive(input)){if(_setValueByActive(input)){_o(input).trigger('change')}}
else if(_selectModeIsCreatable(input)){if(!_inputValueEqualToOriginalValue(input)){_o(input).val(_i(input).val()).trigger('change')}}
else if(_selectModeIsEmpty(input)){if(_i(input).val()!=''&&(!_i(input).data('value'))&&(!_o(input).val())){_i(input).val('')}
else if(!_inputValueEqualToOriginalValue(input)){_i(input).val('');_i(input).data('value','');_o(input).val('').trigger('change')}}
else{if(_i(input).val()){_setValue(input,_o(input).val())}
else{var old_value=_o(input).val();_setValue(input,'');if(old_value!=''){_o(input).trigger('change')}}}}
function _eventFocus(e){var input=_i($(this));if(_set(input,"autoOpen")){methods.show.call(input,e)}}
function _eventBlur(e){var input=_i($(this));var original=_o(input);if(_selectModeIsEmpty(input)){return}}
function _eventKeyDown(e){var input=$(this);var wrapped_list=_getWrappedList();dd(_name(input)+'._eventKeyDown:'+e.keyCode+'; charCode:'+e.charCode);switch(e.keyCode){case 37:case 38:methods.show.call(input,e);_changeWrappedListSelected(input,-1);break;case 39:case 40:methods.show.call(input,e);_changeWrappedListSelected(input,1);break;case 27:if(_selectModeIsCreatable(input)){if(!_inputValueEqualToOriginalValue(input)){_o(input).trigger('change')}}
else{_setValue(input,_o(input).val())}
_hideWrappedList();break;case 9:_setValueForInput(input);_hideWrappedList();break;case 13:e.preventDefault();methods.toggle.call(input,e);if(_setValueByActive(input)){_o(input).trigger('change')}
else{if(_isCreatable(input)){if(!_inputValueEqualToOriginalValue(input)){_o(input).trigger('change')}}}
break;case 8:if(input.val()==''&&(_typeIsMultiple(input)||_typeIsTag(input))&&_getInputMultipleElements(input).length){var original=_o(input);var o_value=original.val().split(_set(input,'delimiter'));if(o_value.length){o_value.pop();original.val(o_value).trigger('change')}}
break;default:input.data('value','');break}}
function _eventKeyUp(e){var input=$(this);var wrapped_list=_getWrappedList();dd(_name(input)+'._eventKeyUp:'+e.keyCode);if($.inArray(e.keyCode,[37,38,39,40,27,9,13,16,17,18])!=-1){return}
if(_set(input,'url')){var data=_set(input,'data');if(e.keyCode==8&&data.length){_matchHighlightInRender(input);return}
var delay=parseFloat(_set(input,'urlDelay'));var delayHandler=_set(input,'delayHandler');if(delayHandler){clearTimeout(delayHandler);_set(input,'delayHandler',!1)}
delayHandler=setTimeout(_loadData,delay*1000,input,function(input){_dataRender(input);var wrapped_elements=_getWrappedListElements();if(_isWrappedListVisible(input)&&_getWrappedListElements(!0).length==0&&wrapped_elements.length){wrapped_list.first().addClass('inputpicker-active')}
_matchActiveInRender(input);_matchHighlightInRender(input);if(!input.is(":focus")){dd('focus',input)
input.focus()}});_set(input,'delayHandler',delayHandler)}
else{if(_set(input,'filterOpen')){_dataRender(input)}
else{methods.show.call(input,e)}
var wrapped_elements=_getWrappedListElements();if(_isWrappedListVisible(input)&&_getWrappedListElements(!0).length==0&&wrapped_elements.length){wrapped_list.first().addClass('inputpicker-active')}
_matchActiveInRender(input);_matchHighlightInRender(input)}}
function _isDefined(v){return typeof v!='undefined'}
function _isObject(v){return typeof v=='object'}
function _isArray(v){return Array.isArray(v)}
function _inArray(k,a){for(var i=0;i<a.length;i++){if(k==a[i]){return i}}
return-1}
$.fn.inputpicker=function(method){if(!this.length)return this;if(typeof method=='object'||!method){return methods.init.apply(this,arguments)}
else if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}
else{$.error("Method "+method+" does not exist on jQuery.inputpicker")}}
$.fn.inputpicker.defaults={width:'100%',height:'200px',autoOpen:!1,tabToSelect:!1,creatable:!1,selectMode:'restore',headShow:!1,multiple:!1,tag:!1,delimiter:',',data:[],fields:[],fieldValue:'value',fieldText:'',filterOpen:!1,filterType:'',filterField:'',limit:0,url:'',urlCache:!1,urlParam:{},urlDelay:0,pagination:!1,pageMode:'',pageField:'p',pageLimitField:'limit',pageCurrent:1,pageCountField:'count',pageCount:0,listBackgroundColor:'',listBorderColor:'',rowSelectedBackgroundColor:'',rowSelectedFontColor:'',highlightResult:!1,responsive:!0,_bottom:'',popover:''};$.fn.inputpicker.elements=[{}]})