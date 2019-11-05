
var crb_images=[],crb_links=[], crb_texts=[];
chrome.storage.local.get(['crb_images','crb_links','crb_texts'], function(results){
    if (results.crb_images) {
        crb_images = JSON.parse(results.crb_images)
    }
    if (results.crb_links) {
        crb_links = JSON.parse(results.crb_links)
    }
    if (results.crb_texts) {
        crb_texts = JSON.parse(results.crb_texts)
    }
})


searchUrbanDict = function (selected) {
        
    if (selected.mediaType== "image") {
        crb_images.push(selected.srcUrl)
        chrome.storage.local.set({ 'crb_images': JSON.stringify(crb_images)})
    } else if (selected.linkUrl){
        crb_links.push(selected.linkUrl)
        chrome.storage.local.set({ 'crb_links': JSON.stringify(crb_links) })
    } else if (selected.selectionText){
        crb_texts.push(selected.selectionText)
        chrome.storage.local.set({ 'crb_texts': JSON.stringify(crb_texts) })
    }
    
};

chrome.contextMenus.create({
    title: "Add to Bookmark",
    id: "crb",
    contexts: ["selection", "link", "image", "video", "frame", "audio"],  // ContextType
    onclick: searchUrbanDict // A callback function
});
/* chrome.contextMenus.create({
    title: "The first action to click",
    parentId: "crb",
    contexts: ["selection"],
    onclick: searchUrbanDict
});

chrome.contextMenus.create({
    title: "The second action to click",
    parentId: "crb",
    contexts: ["selection"],
    onclick: searchUrbanDict
}); */

chrome.runtime.onMessage.addListener(function (message,  sender,  sendResponse){

    
    if (message.type == "getbookmarks") {
        sendResponse(JSON.stringify({images: crb_images, links: crb_links, texts: crb_texts}))
    }
    if (message.type == "deletebookmark") {
        switch (message.bookmarktype) {
            case 'images':
                var index = crb_images.indexOf(message.image_src);
                if (index !== -1) crb_images.splice(index, 1);
                chrome.storage.local.set({ 'crb_images': JSON.stringify(crb_images) })
                break;
            case 'links':
                var index = crb_links.indexOf(message.link);
                if (index !== -1) crb_links.splice(index, 1);
                chrome.storage.local.set({ 'crb_links': JSON.stringify(crb_links) })
                break;
            case 'texts':
                var index = crb_texts.indexOf(message.text);
                if (index !== -1) crb_texts.splice(index, 1);
                chrome.storage.local.set({ 'crb_texts': JSON.stringify(crb_texts) })
                break;
        
            default:
                break;
        }
    }
})