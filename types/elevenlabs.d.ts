// Declaraciones de tipos para el widget de ElevenLabs Conversational AI
declare namespace JSX {
    interface IntrinsicElements {
        'elevenlabs-convai': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                'agent-id'?: string;
            },
            HTMLElement
        >;
    }
}
