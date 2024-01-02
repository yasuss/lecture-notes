import React, { useState } from "react";

import { Divider, Skeleton } from "@mui/material";

import { ParsedNotes } from "shared/types/parsed-notes";
import { UploadButton } from "shared/ui/upload-button";

import { ExportNotion } from "features/export-notion";
import { ParsedJson } from "features/parsed-json";
import { TranscribeAudio } from "features/transcribe-audio";

import * as Styled from "./AudioConversion.styles";

export const AudioConversion = () => {
    const [file, setFile] = useState<File | undefined>();
    const [convertedAudio, setConvertedAudio] = useState<
        ParsedNotes | undefined
    >();
    const [isLoading, setLoading] = useState(false);

    return (
        <Styled.Container>
            <UploadButton setFile={setFile} />

            {file ? (
                <TranscribeAudio
                    file={file}
                    setResult={setConvertedAudio}
                    setLoading={setLoading}
                />
            ) : null}

            {convertedAudio ? <ExportNotion notes={convertedAudio} /> : null}

            <Divider />

            {isLoading ? (
                <Skeleton variant='rounded' height={200} />
            ) : (
                <ParsedJson notes={convertedAudio} />
            )}
        </Styled.Container>
    );
};