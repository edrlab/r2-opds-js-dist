"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opds2_1 = require("./opds2/opds2");
const opds2_belongsTo_1 = require("./opds2/opds2-belongsTo");
const opds2_collection_1 = require("./opds2/opds2-collection");
const opds2_contributor_1 = require("./opds2/opds2-contributor");
const opds2_indirectAcquisition_1 = require("./opds2/opds2-indirectAcquisition");
const opds2_link_1 = require("./opds2/opds2-link");
const opds2_metadata_1 = require("./opds2/opds2-metadata");
const opds2_price_1 = require("./opds2/opds2-price");
const opds2_properties_1 = require("./opds2/opds2-properties");
const opds2_publication_1 = require("./opds2/opds2-publication");
const opds2_publicationMetadata_1 = require("./opds2/opds2-publicationMetadata");
const opds2_subject_1 = require("./opds2/opds2-subject");
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
            const cont = new opds2_contributor_1.OPDSContributor();
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
            const collLink = new opds2_link_1.OPDSLink();
            if (entry.Links) {
                entry.Links.forEach((l) => {
                    if (l.HasRel("http://opds-spec.org/acquisition")) {
                        isAnNavigation = false;
                    }
                    if (l.HasRel("collection") || l.HasRel("http://opds-spec.org/group")) {
                        collLink.AddRel("collection");
                        collLink.Href = l.Href;
                        collLink.Title = l.Title;
                    }
                });
            }
            if (!isAnNavigation) {
                const p = new opds2_publication_1.OPDSPublication();
                p.Metadata = new opds2_publicationMetadata_1.OPDSPublicationMetadata();
                p.Metadata.Title = entry.Title;
                if (entry.DcIdentifier) {
                    p.Metadata.Identifier = entry.DcIdentifier;
                }
                else {
                    p.Metadata.Identifier = entry.Id;
                }
                p.Metadata.Language = [entry.DcLanguage];
                p.Metadata.Modified = entry.Updated;
                p.Metadata.PublicationDate = entry.Published;
                p.Metadata.Rights = entry.DcRights;
                if (entry.Series) {
                    entry.Series.forEach((s) => {
                        const coll = new opds2_collection_1.OPDSCollection();
                        coll.Name = s.Name;
                        coll.Position = s.Position;
                        const link = new opds2_link_1.OPDSLink();
                        link.Href = s.Url;
                        coll.Links = [];
                        coll.Links.push(link);
                        if (!p.Metadata.BelongsTo) {
                            p.Metadata.BelongsTo = new opds2_belongsTo_1.OPDSBelongsTo();
                        }
                        if (!p.Metadata.BelongsTo.Series) {
                            p.Metadata.BelongsTo.Series = [];
                        }
                        p.Metadata.BelongsTo.Series.push(coll);
                    });
                }
                if (entry.DcPublisher) {
                    const c = new opds2_contributor_1.OPDSContributor();
                    c.Name = entry.DcPublisher;
                    if (!p.Metadata.Publisher) {
                        p.Metadata.Publisher = [];
                    }
                    p.Metadata.Publisher.push(c);
                }
                if (entry.Categories) {
                    entry.Categories.forEach((cat) => {
                        const subj = new opds2_subject_1.OPDSSubject();
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
                        const cont = new opds2_contributor_1.OPDSContributor();
                        cont.Name = aut.Name;
                        cont.Identifier = aut.Uri;
                        if (!p.Metadata.Author) {
                            p.Metadata.Author = [];
                        }
                        p.Metadata.Author.push(cont);
                    });
                }
                if (entry.Content) {
                    p.Metadata.Description = entry.Content;
                }
                else if (entry.Summary) {
                    p.Metadata.Description = entry.Summary;
                }
                if (entry.Links) {
                    entry.Links.forEach((link) => {
                        const l = new opds2_link_1.OPDSLink();
                        l.Href = link.Href;
                        l.TypeLink = link.Type;
                        l.AddRel(link.Rel);
                        l.Title = link.Title;
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
                            link.HasRel("http://opds-spec.org/image/thumbnail")) {
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
                const linkNav = new opds2_link_1.OPDSLink();
                linkNav.Title = entry.Title;
                if (entry.Links && entry.Links[0]) {
                    linkNav.AddRel(entry.Links[0].Rel);
                    linkNav.TypeLink = entry.Links[0].Type;
                    linkNav.Href = entry.Links[0].Href;
                }
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
            const linkFeed = new opds2_link_1.OPDSLink();
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