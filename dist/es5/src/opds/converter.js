"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("r2-shared-js/dist/es5/src/models/metadata");
var metadata_belongsto_1 = require("r2-shared-js/dist/es5/src/models/metadata-belongsto");
var metadata_contributor_1 = require("r2-shared-js/dist/es5/src/models/metadata-contributor");
var metadata_subject_1 = require("r2-shared-js/dist/es5/src/models/metadata-subject");
var publication_link_1 = require("r2-shared-js/dist/es5/src/models/publication-link");
var opds2_1 = require("./opds2/opds2");
var opds2_indirectAcquisition_1 = require("./opds2/opds2-indirectAcquisition");
var opds2_link_1 = require("./opds2/opds2-link");
var opds2_metadata_1 = require("./opds2/opds2-metadata");
var opds2_price_1 = require("./opds2/opds2-price");
var opds2_properties_1 = require("./opds2/opds2-properties");
var opds2_publication_1 = require("./opds2/opds2-publication");
function convertOpds1ToOpds2_EntryToPublication(entry) {
    var p = new opds2_publication_1.OPDSPublication();
    p.Metadata = new metadata_1.Metadata();
    p.Metadata.Title = entry.Title;
    if (entry.DcIdentifier) {
        p.Metadata.Identifier = entry.DcIdentifier;
    }
    else {
        p.Metadata.Identifier = entry.Id;
    }
    if (entry.DcLanguage) {
        p.Metadata.Language = [entry.DcLanguage];
    }
    p.Metadata.Modified = entry.Updated;
    p.Metadata.PublicationDate = entry.Published;
    p.Metadata.Rights = entry.DcRights;
    if (entry.Series) {
        entry.Series.forEach(function (s) {
            var coll = new metadata_contributor_1.Contributor();
            coll.Name = s.Name;
            coll.Position = s.Position;
            var link = new publication_link_1.Link();
            link.Href = s.Url;
            coll.Links = [];
            coll.Links.push(link);
            if (!p.Metadata.BelongsTo) {
                p.Metadata.BelongsTo = new metadata_belongsto_1.BelongsTo();
            }
            if (!p.Metadata.BelongsTo.Series) {
                p.Metadata.BelongsTo.Series = [];
            }
            p.Metadata.BelongsTo.Series.push(coll);
        });
    }
    if (entry.DcPublisher) {
        var c = new metadata_contributor_1.Contributor();
        c.Name = entry.DcPublisher;
        if (!p.Metadata.Publisher) {
            p.Metadata.Publisher = [];
        }
        p.Metadata.Publisher.push(c);
    }
    if (entry.Categories) {
        entry.Categories.forEach(function (cat) {
            var subj = new metadata_subject_1.Subject();
            subj.Code = cat.Term;
            subj.Name = cat.Label;
            subj.Scheme = cat.Scheme;
            if (!p.Metadata.Subject) {
                p.Metadata.Subject = [];
            }
            p.Metadata.Subject.push(subj);
        });
    }
    if (entry.Authors) {
        entry.Authors.forEach(function (aut) {
            var cont = new metadata_contributor_1.Contributor();
            cont.Name = aut.Name;
            cont.Identifier = aut.Uri;
            if (!p.Metadata.Author) {
                p.Metadata.Author = [];
            }
            p.Metadata.Author.push(cont);
        });
    }
    if (entry.Summary) {
        p.Metadata.Description = ((entry.SummaryType === "text/html" || entry.SummaryType === "html") ?
            entry.Summary.replace(/ xmlns=["'][^"']+["']/g, "") :
            entry.Summary);
    }
    if (entry.Content) {
        var txt = ((entry.ContentType === "text/html" || entry.ContentType === "html") ?
            entry.Content.replace(/ xmlns=["'][^"']+["']/g, "") :
            entry.Content);
        if (p.Metadata.Description) {
            p.Metadata.Description += "\n\n";
            p.Metadata.Description += txt;
        }
        else {
            p.Metadata.Description = txt;
        }
    }
    if (entry.Links) {
        entry.Links.forEach(function (link) {
            var l = new opds2_link_1.OPDSLink();
            l.Href = link.Href;
            l.TypeLink = link.Type;
            l.AddRel(link.Rel);
            l.Title = link.Title;
            if (link.OpdsIndirectAcquisitions && link.OpdsIndirectAcquisitions.length) {
                if (!l.Properties) {
                    l.Properties = new opds2_properties_1.OPDSProperties();
                }
                link.OpdsIndirectAcquisitions.forEach(function (ia) {
                    var ind = new opds2_indirectAcquisition_1.OPDSIndirectAcquisition();
                    ind.TypeAcquisition = ia.OpdsIndirectAcquisitionType;
                    if (ia.OpdsIndirectAcquisitions && ia.OpdsIndirectAcquisitions.length) {
                        ia.OpdsIndirectAcquisitions.forEach(function (iac) {
                            var cia = new opds2_indirectAcquisition_1.OPDSIndirectAcquisition();
                            cia.TypeAcquisition = iac.OpdsIndirectAcquisitionType;
                            if (!ind.Children) {
                                ind.Children = [];
                            }
                            ind.Children.push(cia);
                        });
                    }
                    if (!l.Properties.IndirectAcquisitions) {
                        l.Properties.IndirectAcquisitions = [];
                    }
                    l.Properties.IndirectAcquisitions.push(ind);
                });
            }
            if (link.OpdsPrice && link.OpdsPriceCurrencyCode) {
                if (!l.Properties) {
                    l.Properties = new opds2_properties_1.OPDSProperties();
                }
                l.Properties.Price = new opds2_price_1.OPDSPrice();
                l.Properties.Price.Currency = link.OpdsPriceCurrencyCode;
                l.Properties.Price.Value = link.OpdsPrice;
            }
            if (link.HasRel("collection") || link.HasRel("http://opds-spec.org/group")) {
            }
            else if (link.HasRel("http://opds-spec.org/image") ||
                link.HasRel("http://opds-spec.org/image/thumbnail") ||
                link.HasRel("x-stanza-cover-image") ||
                link.HasRel("x-stanza-cover-image-thumbnail")) {
                if (!p.Images) {
                    p.Images = [];
                }
                p.Images.push(l);
            }
            else {
                if (!p.Links) {
                    p.Links = [];
                }
                p.Links.push(l);
            }
        });
    }
    return p;
}
exports.convertOpds1ToOpds2_EntryToPublication = convertOpds1ToOpds2_EntryToPublication;
function convertOpds1ToOpds2_EntryToLink(entry) {
    var linkNav = new opds2_link_1.OPDSLink();
    linkNav.Title = entry.Title;
    if (entry.Summary) {
        var txt = ((entry.SummaryType === "text/html" || entry.SummaryType === "html") ?
            entry.Summary.replace(/ xmlns=["'][^"']+["']/g, "") :
            entry.Summary);
        if (linkNav.Title) {
            linkNav.Title += "\n\n";
            linkNav.Title += txt;
        }
        else {
            linkNav.Title = txt;
        }
    }
    if (entry.Content) {
        var txt = ((entry.ContentType === "text/html" || entry.ContentType === "html") ?
            entry.Content.replace(/ xmlns=["'][^"']+["']/g, "") :
            entry.Content);
        if (linkNav.Title) {
            linkNav.Title += "\n\n";
            linkNav.Title += txt;
        }
        else {
            linkNav.Title = txt;
        }
    }
    if (entry.Links) {
        var atomLink = entry.Links.find(function (l) {
            return l.Type && l.Type.indexOf("application/atom+xml") >= 0;
        });
        var link = atomLink ? atomLink : (entry.Links[0] ? entry.Links[0] : undefined);
        if (link) {
            linkNav.AddRel(link.Rel);
            linkNav.TypeLink = link.Type;
            linkNav.Href = link.Href;
        }
    }
    return linkNav;
}
exports.convertOpds1ToOpds2_EntryToLink = convertOpds1ToOpds2_EntryToLink;
function convertOpds1ToOpds2(feed) {
    var opds2feed = new opds2_1.OPDSFeed();
    opds2feed.Metadata = new opds2_metadata_1.OPDSMetadata();
    opds2feed.Metadata.Title = feed.Title;
    opds2feed.Metadata.Modified = feed.Updated;
    if (feed.OpensearchTotalResults) {
        opds2feed.Metadata.NumberOfItems = feed.OpensearchTotalResults;
    }
    if (feed.OpensearchItemsPerPage) {
        opds2feed.Metadata.ItemsPerPage = feed.OpensearchItemsPerPage;
    }
    if (feed.Authors) {
        feed.Authors.forEach(function (aut) {
            var cont = new metadata_contributor_1.Contributor();
            cont.Name = aut.Name;
            cont.Identifier = aut.Uri;
            if (!opds2feed.Metadata.Author) {
                opds2feed.Metadata.Author = [];
            }
            opds2feed.Metadata.Author.push(cont);
        });
    }
    if (feed.Entries) {
        feed.Entries.forEach(function (entry) {
            var isAnNavigation = true;
            var thereIsAtomLink = false;
            var collLink = new opds2_link_1.OPDSLink();
            if (entry.Links) {
                entry.Links.forEach(function (l) {
                    if (l.Href) {
                        l.Href = l.Href.replace(/ /g, "%20");
                    }
                    if (l.Type === "image/jpg") {
                        l.Type = "image/jpeg";
                    }
                    if ((l.Rel && l.Rel.indexOf("http://opds-spec.org/acquisition") === 0) ||
                        (!l.Rel && l.Type === "application/epub+zip")) {
                        if (!l.Rel) {
                            l.Rel = "http://opds-spec.org/acquisition";
                        }
                        isAnNavigation = false;
                    }
                    if (l.HasRel("collection") || l.HasRel("http://opds-spec.org/group")) {
                        collLink.AddRel("collection");
                        collLink.Href = l.Href;
                        collLink.Title = l.Title;
                    }
                    if (l.Type && l.Type.indexOf("application/atom+xml") >= 0) {
                        thereIsAtomLink = true;
                    }
                });
                if (isAnNavigation && !thereIsAtomLink) {
                    isAnNavigation = false;
                }
            }
            if (!isAnNavigation) {
                var p = convertOpds1ToOpds2_EntryToPublication(entry);
                if (collLink.Href) {
                    opds2feed.AddPublicationInGroup(p, collLink);
                }
                else {
                    if (!opds2feed.Publications) {
                        opds2feed.Publications = [];
                    }
                    opds2feed.Publications.push(p);
                }
            }
            else {
                var linkNav = convertOpds1ToOpds2_EntryToLink(entry);
                if (collLink.Href) {
                    opds2feed.AddNavigationInGroup(linkNav, collLink);
                }
                else {
                    if (!opds2feed.Navigation) {
                        opds2feed.Navigation = [];
                    }
                    opds2feed.Navigation.push(linkNav);
                }
            }
        });
    }
    if (feed.Links) {
        feed.Links.forEach(function (l) {
            if (l.Href) {
                l.Href = l.Href.replace(/ /g, "%20");
            }
            var linkFeed = new opds2_link_1.OPDSLink();
            linkFeed.Href = l.Href;
            linkFeed.AddRel(l.Rel);
            linkFeed.TypeLink = l.Type;
            linkFeed.Title = l.Title;
            if (l.HasRel("http://opds-spec.org/facet")) {
                linkFeed.Properties = new opds2_properties_1.OPDSProperties();
                linkFeed.Properties.NumberOfItems = l.ThrCount;
                opds2feed.AddFacet(linkFeed, l.FacetGroup);
            }
            else {
                if (!opds2feed.Links) {
                    opds2feed.Links = [];
                }
                opds2feed.Links.push(linkFeed);
            }
        });
    }
    return opds2feed;
}
exports.convertOpds1ToOpds2 = convertOpds1ToOpds2;
//# sourceMappingURL=converter.js.map