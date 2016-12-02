// 复制到剪贴板
function copyToClipboard(elem) {
    var targetId = "__copyToCilpboardCopyText__";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // 如果是input标签或textarea，则直接指定该节点
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // 如果不是，则使用节点的textContent
        target = document.getElementById(targetId);
        if (!target) {
            //如果不存在，则创建一个
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "0";
            target.style.top = "-9999px";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // 聚焦目标节点，选中它的内容
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    // 进行复制操作
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // 不再聚焦
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    if (isInput) {
        // 清空临时数据
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // 清空临时数据
        target.textContent = "";
    }
    return succeed;
}
