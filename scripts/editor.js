(() => {
  const { liveEditTextarea, livePreviewInner: livePreview } = window.elements;
  const appState = window.appState;
  const { updateDownloadButtonVisibility } = window.utils;

  liveEditTextarea.addEventListener("input", (e) => {
    appState.currentMarkdown = e.target.value;
    livePreview.innerHTML = marked.parse(appState.currentMarkdown);
    updateDownloadButtonVisibility();
  });

  liveEditTextarea.addEventListener("scroll", () => {
    const ratio =
      liveEditTextarea.scrollTop /
      (liveEditTextarea.scrollHeight - liveEditTextarea.clientHeight);
    // Note: You don’t have livePreviewOuter in elements, assuming scroll sync is disabled or remove this
    // livePreviewOuter.scrollTop =
    //   ratio * (livePreviewOuter.scrollHeight - livePreviewOuter.clientHeight);
  });
})();
