import { BookCitation, Registry } from "./types/Citation.js"
import './types/BookCitation.js'
import { createModal } from "./types/CitationModal.js"

const node = document.getElementById('overview') as any
createModal(node, Registry.get('book'))
