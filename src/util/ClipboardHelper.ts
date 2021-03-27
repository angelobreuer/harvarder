export default function copyRichContentToClipboard(element: HTMLElement) {
    const listener = (event: ClipboardEvent) => {
        event.clipboardData!.setData('text/html', element.innerHTML)
        event.clipboardData!.setData('text/plain', element.innerText)
        event.preventDefault()
    }

    document.addEventListener('copy', listener)
    document.execCommand('copy')
    document.removeEventListener('copy', listener)

    setTimeout(() => alert('Der folgende Text wurde erfolgreich kopiert: \n\n' + element.innerText), 1)
}
