module Type exposing (BodyPattern, Kind, Site, UrlPattern)


type alias Site =
    { urlPatterns : List UrlPattern, kinds : List Kind }


type alias UrlPattern =
    { origin : String, pathname : String }


type alias Kind =
    { name : String, bodyPatterns : List BodyPattern }


type alias BodyPattern =
    List String
