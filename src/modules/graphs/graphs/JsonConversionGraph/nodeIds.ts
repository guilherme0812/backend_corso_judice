export enum NodeId {
    END = '__end__',
    // SUPERVISOR = 'supervisorAgent',
    JSON_CONVERSION = 'audioConversion',
    // WHO_IS_THE_ARTIST = 'whoIsTheArtistAgent',
    // GENERATE_LYRICS = 'generateLyricsAgent',
}

export const DOMAIN_AGENTS: NodeId[] = [
    // NodeId.WHO_IS_THE_ARTIST,
    //  NodeId.GENERATE_LYRICS,
    NodeId.JSON_CONVERSION,
];
