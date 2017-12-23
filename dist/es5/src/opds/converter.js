"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opds2_1 = require("./opds2/opds2");
var opds2_belongsTo_1 = require("./opds2/opds2-belongsTo");
var opds2_collection_1 = require("./opds2/opds2-collection");
var opds2_contributor_1 = require("./opds2/opds2-contributor");
var opds2_indirectAcquisition_1 = require("./opds2/opds2-indirectAcquisition");
var opds2_link_1 = require("./opds2/opds2-link");
var opds2_metadata_1 = require("./opds2/opds2-metadata");
var opds2_price_1 = require("./opds2/opds2-price");
var opds2_properties_1 = require("./opds2/opds2-properties");
var opds2_publication_1 = require("./opds2/opds2-publication");
var opds2_publicationMetadata_1 = require("./opds2/opds2-publicationMetadata");
var opds2_subject_1 = require("./opds2/opds2-subject");
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
            var cont = new opds2_contributor_1.OPDSContributor();
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
            var collLink = new opds2_link_1.OPDSLink();
            if (entry.Links) {
                entry.Links.forEach(function (l) {
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
                var p_1 = new opds2_publication_1.OPDSPublication();
                p_1.Metadata = new opds2_publicationMetadata_1.OPDSPublicationMetadata();
                p_1.Metadata.Title = entry.Title;
                if (entry.DcIdentifier) {
                    p_1.Metadata.Identifier = entry.DcIdentifier;
                }
                else {
                    p_1.Metadata.Identifier = entry.Id;
                }
                p_1.Metadata.Language = [entry.DcLanguage];
                p_1.Metadata.Modified = entry.Updated;
                p_1.Metadata.PublicationDate = entry.Published;
                p_1.Metadata.Rights = entry.DcRights;
                if (entry.Series) {
                    entry.Series.forEach(function (s) {
                        var coll = new opds2_collection_1.OPDSCollection();
                        coll.Name = s.Name;
                        coll.Position = s.Position;
                        var link = new opds2_link_1.OPDSLink();
                        link.Href = s.Url;
                        coll.Links = [];
                        coll.Links.push(link);
                        if (!p_1.Metadata.BelongsTo) {
                            p_1.Metadata.BelongsTo = new opds2_belongsTo_1.OPDSBelongsTo();
                        }
                        if (!p_1.Metadata.BelongsTo.Series) {
                            p_1.Metadata.BelongsTo.Series = [];
                        }
                        p_1.Metadata.BelongsTo.Series.push(coll);
                    });
                }
                if (entry.DcPublisher) {
                    var c = new opds2_contributor_1.OPDSContributor();
                    c.Name = entry.DcPublisher;
                    if (!p_1.Metadata.Publisher) {
                        p_1.Metadata.Publisher = [];
                    }
                    p_1.Metadata.Publisher.push(c);
                }
                if (entry.Categories) {
                    entry.Categories.forEach(function (cat) {
                        var subj = new opds2_subject_1.OPDSSubject();
                        subj.Code = cat.Term;
                        subj.Name = cat.Label;
                        subj.Scheme = cat.Scheme;
                        if (!p_1.Metadata.Subject) {
                            p_1.Metadata.Subject = [];
                        }
                        p_1.Metadata.Subject.push(subj);
                    });
                }
                if (entry.Authors) {
                    entry.Authors.forEach(function (aut) {
                        var cont = new opds2_contributor_1.OPDSContributor();
                        cont.Name = aut.Name;
                        cont.Identifier = aut.Uri;
                        if (!p_1.Metadata.Author) {
                            p_1.Metadata.Author = [];
                        }
                        p_1.Metadata.Author.push(cont);
                    });
                }
                if (entry.Content) {
                    p_1.Metadata.Description = entry.Content;
                }
                else if (entry.Summary) {
                    p_1.Metadata.Description = entry.Summary;
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
                            link.HasRel("http://opds-spec.org/image/thumbnail")) {
                            if (!p_1.Images) {
                                p_1.Images = [];
                            }
                            p_1.Images.push(l);
                        }
                        else {
                            if (!p_1.Links) {
                                p_1.Links = [];
                            }
                            p_1.Links.push(l);
                        }
                    });
                }
                if (collLink.Href) {
                    opds2feed.AddPublicationInGroup(p_1, collLink);
                }
                else {
                    if (!opds2feed.Publications) {
                        opds2feed.Publications = [];
                    }
                    opds2feed.Publications.push(p_1);
                }
            }
            else {
                var linkNav = new opds2_link_1.OPDSLink();
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
        feed.Links.forEach(function (l) {
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