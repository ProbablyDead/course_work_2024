import React, { forwardRef, Ref } from "react";

interface DocumentTextProps {
    text: string;
    isEditable: boolean;
};

const DocumentText = forwardRef<HTMLDivElement, DocumentTextProps>(({text, isEditable}, ref: Ref<HTMLDivElement>) => {
    return (
    <div
        ref={ref}
        contentEditable={isEditable}
        dangerouslySetInnerHTML={{__html: text}}>
    </div>
    );
});

export default DocumentText;
