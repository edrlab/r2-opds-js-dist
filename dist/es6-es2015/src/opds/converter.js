"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtmlEntities = exports.unescapeHtmlEntities = void 0;
exports.convertOpds1ToOpds2_EntryToPublication = convertOpds1ToOpds2_EntryToPublication;
exports.convertOpds1ToOpds2_EntryToLink = convertOpds1ToOpds2_EntryToLink;
exports.convertOpds1ToOpds2 = convertOpds1ToOpds2;
const metadata_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata");
const metadata_belongsto_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata-belongsto");
const metadata_contributor_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata-contributor");
const metadata_subject_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata-subject");
const publication_link_1 = require("r2-shared-js/dist/es6-es2015/src/models/publication-link");
const opds2_1 = require("./opds2/opds2");
const opds2_availability_1 = require("./opds2/opds2-availability");
const opds2_copy_1 = require("./opds2/opds2-copy");
const opds2_hold_1 = require("./opds2/opds2-hold");
const opds2_indirectAcquisition_1 = require("./opds2/opds2-indirectAcquisition");
const opds2_link_1 = require("./opds2/opds2-link");
const opds2_metadata_1 = require("./opds2/opds2-metadata");
const opds2_price_1 = require("./opds2/opds2-price");
const opds2_properties_1 = require("./opds2/opds2-properties");
const opds2_publication_1 = require("./opds2/opds2-publication");
const unescapeHtmlEntities = (str, onlyEssential = undefined) => {
    if (onlyEssential) {
        return str
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&");
    }
    return str
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&");
};
exports.unescapeHtmlEntities = unescapeHtmlEntities;
const escapeHtmlEntities = (str, onlyEssential = undefined) => {
    if (onlyEssential) {
        return str
            .replace(/</g, "&lt;")
            .replace(/&/g, "&amp;");
    }
    return str
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/&/g, "&amp;");
};
exports.escapeHtmlEntities = escapeHtmlEntities;
const processTypedString = (str, type) => {
    if (type === "text/html" || type === "html") {
        return str;
    }
    else if (type === "xhtml" || type && type.indexOf("xhtml") >= 0) {
        return str.replace(/http:\/\/www\.w3\.org\/2005\/Atom/g, "http://www.w3.org/1999/xhtml");
    }
    return str;
};
const convertContentSummary = (entry) => {
    if (entry.Content) {
        return processTypedString(entry.Content, entry.ContentType);
    }
    else if (entry.Summary) {
        return processTypedString(entry.Summary, entry.SummaryType);
    }
    return undefined;
};
function convertOpds1ToOpds2_EntryToPublication(entry) {
    const p = new opds2_publication_1.OPDSPublication();
    p.Metadata = new metadata_1.Metadata();
    if (entry.Title) {
        p.Metadata.Title = processTypedString(entry.Title, entry.TitleType);
    }
    if (entry.SubTitle) {
        p.Metadata.SubTitle = processTypedString(entry.SubTitle, entry.SubTitleType);
    }
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
        entry.Series.forEach((s) => {
            const coll = new metadata_contributor_1.Contributor();
            coll.Name = s.Name;
            coll.Position = s.Position;
            const link = new publication_link_1.Link();
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
        const c = new metadata_contributor_1.Contributor();
        c.Name = entry.DcPublisher;
        if (!p.Metadata.Publisher) {
            p.Metadata.Publisher = [];
        }
        p.Metadata.Publisher.push(c);
    }
    if (entry.Categories) {
        entry.Categories.forEach((cat) => {
            const subj = new metadata_subject_1.Subject();
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
        entry.Authors.forEach((aut) => {
            const cont = new metadata_contributor_1.Contributor();
            cont.Name = aut.Name;
            cont.Identifier = aut.Uri;
            if (!p.Metadata.Author) {
                p.Metadata.Author = [];
            }
            p.Metadata.Author.push(cont);
        });
    }
    const t = convertContentSummary(entry);
    if (t) {
        p.Metadata.Description = t;
    }
    if (entry.Links) {
        entry.Links.forEach((link) => {
            const l = new opds2_link_1.OPDSLink();
            portLinkInfo(link, l);
            if (link.LcpHashedPassphrase) {
                if (!l.Properties) {
                    l.Properties = new opds2_properties_1.OPDSProperties();
                }
                if (!l.Properties.AdditionalJSON) {
                    l.Properties.AdditionalJSON = {};
                }
                l.Properties.AdditionalJSON.lcp_hashed_passphrase = link.LcpHashedPassphrase;
            }
            if (link.OpdsIndirectAcquisitions && link.OpdsIndirectAcquisitions.length) {
                if (!l.Properties) {
                    l.Properties = new opds2_properties_1.OPDSProperties();
                }
                link.OpdsIndirectAcquisitions.forEach((ia) => {
                    const ind = new opds2_indirectAcquisition_1.OPDSIndirectAcquisition();
                    ind.TypeAcquisition = ia.OpdsIndirectAcquisitionType;
                    if (ia.OpdsIndirectAcquisitions && ia.OpdsIndirectAcquisitions.length) {
                        ia.OpdsIndirectAcquisitions.forEach((iac) => {
                            const cia = new opds2_indirectAcquisition_1.OPDSIndirectAcquisition();
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
                link.HasRel("http://opds-spec.org/cover") ||
                link.HasRel("http://opds-spec.org/thumbnail") ||
                link.HasRel("x-stanza-cover-image") ||
                link.HasRel("x-stanza-cover-image-thumbnail")) {
                const iCoverRel = l.Rel.indexOf("http://opds-spec.org/cover");
                if (iCoverRel >= 0) {
                    l.Rel[iCoverRel] = "http://opds-spec.org/image";
                }
                const iThumbnailRel = l.Rel.indexOf("http://opds-spec.org/thumbnail");
                if (iThumbnailRel >= 0) {
                    l.Rel[iThumbnailRel] = "http://opds-spec.org/image/thumbnail";
                }
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
function convertOpds1ToOpds2_EntryToLink(entry) {
    const linkNav = new opds2_link_1.OPDSLink();
    if (entry.Title) {
        const t = processTypedString(entry.Title, entry.TitleType);
        if (t) {
            linkNav.Title = t;
        }
    }
    if (entry.Summary) {
        const s = processTypedString(entry.Summary, entry.SummaryType);
        if (s) {
            if (!linkNav.Properties) {
                linkNav.Properties = new opds2_properties_1.OPDSProperties();
            }
            if (!linkNav.Properties.AdditionalJSON) {
                linkNav.Properties.AdditionalJSON = {};
            }
            linkNav.Properties.AdditionalJSON["http://www.w3.org/2005/Atom#summary"] = s;
            linkNav.Properties.AdditionalJSON.title_summary = s;
        }
    }
    if (entry.Links) {
        const atomLink = entry.Links.find((l) => {
            return l.Type && l.Type.indexOf("application/atom+xml") >= 0;
        });
        const link = atomLink ? atomLink : (entry.Links[0] ? entry.Links[0] : undefined);
        if (link) {
            portLinkInfo(link, linkNav);
        }
    }
    return linkNav;
}
function convertOpds1ToOpds2(feed) {
    const opds2feed = new opds2_1.OPDSFeed();
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
        feed.Authors.forEach((aut) => {
            const cont = new metadata_contributor_1.Contributor();
            cont.Name = aut.Name;
            cont.Identifier = aut.Uri;
            if (!opds2feed.Metadata.Author) {
                opds2feed.Metadata.Author = [];
            }
            opds2feed.Metadata.Author.push(cont);
        });
    }
    if (feed.Entries) {
        feed.Entries.forEach((entry) => {
            let isAnNavigation = true;
            let thereIsAtomLink = false;
            const collLink = new opds2_link_1.OPDSLink();
            if (entry.Links) {
                entry.Links.forEach((l) => {
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
                        portLinkInfo(l, collLink);
                    }
                    if (l.Type && l.Type.indexOf("application/atom+xml") >= 0) {
                        thereIsAtomLink = true;
                    }
                });
            }
            const thereIsAuthor = entry.Authors && entry.Authors.length;
            if (isAnNavigation && thereIsAuthor) {
                isAnNavigation = false;
            }
            if (isAnNavigation && !thereIsAtomLink) {
                isAnNavigation = false;
            }
            if (!isAnNavigation) {
                const p = convertOpds1ToOpds2_EntryToPublication(entry);
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
                const linkNav = convertOpds1ToOpds2_EntryToLink(entry);
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
        feed.Links.forEach((l) => {
            if (l.Href) {
                l.Href = l.Href.replace(/ /g, "%20");
            }
            const linkFeed = new opds2_link_1.OPDSLink();
            portLinkInfo(l, linkFeed);
            if (l.HasRel("http://opds-spec.org/facet")) {
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
const portLinkInfo = (linkSource, linkDest) => {
    if (!linkDest.Href && linkSource.Href) {
        linkDest.Href = linkSource.Href;
    }
    if (!linkDest.TypeLink && linkSource.Type) {
        linkDest.TypeLink = linkSource.Type;
    }
    if (!linkDest.Title && linkSource.Title) {
        linkDest.Title = linkSource.Title;
    }
    if ((!linkDest.Rel || !linkDest.Rel.length) && linkSource.Rel) {
        linkDest.AddRel(linkSource.Rel);
    }
    if (linkSource.OpdsAvailability) {
        if (!linkDest.Properties) {
            linkDest.Properties = new opds2_properties_1.OPDSProperties();
        }
        linkDest.Properties.Availability = new opds2_availability_1.OPDSAvailability();
        if (linkSource.OpdsAvailability.Since) {
            linkDest.Properties.Availability.Since = linkSource.OpdsAvailability.Since;
        }
        if (linkSource.OpdsAvailability.Until) {
            linkDest.Properties.Availability.Until = linkSource.OpdsAvailability.Until;
        }
        if (linkSource.OpdsAvailability.State) {
            linkDest.Properties.Availability.State = linkSource.OpdsAvailability.State;
        }
        else if (linkSource.OpdsAvailability.Status) {
            linkDest.Properties.Availability.State = linkSource.OpdsAvailability.Status;
        }
    }
    if (linkSource.OpdsCopies) {
        if (!linkDest.Properties) {
            linkDest.Properties = new opds2_properties_1.OPDSProperties();
        }
        linkDest.Properties.Copies = new opds2_copy_1.OPDSCopy();
        if (typeof linkSource.OpdsCopies.Available === "number") {
            linkDest.Properties.Copies.Available = linkSource.OpdsCopies.Available;
        }
        if (typeof linkSource.OpdsCopies.Total === "number") {
            linkDest.Properties.Copies.Total = linkSource.OpdsCopies.Total;
        }
    }
    if (linkSource.OpdsHolds) {
        if (!linkDest.Properties) {
            linkDest.Properties = new opds2_properties_1.OPDSProperties();
        }
        linkDest.Properties.Holds = new opds2_hold_1.OPDSHold();
        if (typeof linkSource.OpdsHolds.Position === "number") {
            linkDest.Properties.Holds.Position = linkSource.OpdsHolds.Position;
        }
        if (typeof linkSource.OpdsHolds.Total === "number") {
            linkDest.Properties.Holds.Total = linkSource.OpdsHolds.Total;
        }
    }
    if (linkSource.ThrCount) {
        if (!linkDest.Properties) {
            linkDest.Properties = new opds2_properties_1.OPDSProperties();
        }
        linkDest.Properties.NumberOfItems = linkSource.ThrCount;
    }
};
//# sourceMappingURL=converter.js.map