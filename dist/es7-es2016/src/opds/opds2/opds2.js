"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_string_converter_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/ta-json-string-converter");
const ta_json_x_1 = require("ta-json-x");
const opds2_facet_1 = require("./opds2-facet");
const opds2_group_1 = require("./opds2-group");
const opds2_link_1 = require("./opds2-link");
const opds2_metadata_1 = require("./opds2-metadata");
const opds2_publication_1 = require("./opds2-publication");
let OPDSFeed = class OPDSFeed {
    findFirstLinkByRel(rel) {
        return this.Links ? this.Links.find((l) => {
            return l.HasRel(rel);
        }) : undefined;
    }
    AddLink(href, rel, typeLink, templated) {
        const l = new opds2_link_1.OPDSLink();
        l.Href = href;
        l.AddRel(rel);
        l.TypeLink = typeLink;
        if (templated) {
            l.Templated = true;
        }
        if (!this.Links) {
            this.Links = [];
        }
        this.Links.push(l);
    }
    AddNavigation(title, href, rel, typeLink) {
        const l = new opds2_link_1.OPDSLink();
        l.Href = href;
        l.TypeLink = typeLink;
        l.AddRel(rel);
        if (title) {
            l.Title = title;
        }
        if (!this.Navigation) {
            this.Navigation = [];
        }
        this.Navigation.push(l);
    }
    AddPagination(numberItems, itemsPerPage, currentPage, nextLink, prevLink, firstLink, lastLink) {
        if (!this.Metadata) {
            this.Metadata = new opds2_metadata_1.OPDSMetadata();
        }
        this.Metadata.CurrentPage = currentPage;
        this.Metadata.ItemsPerPage = itemsPerPage;
        this.Metadata.NumberOfItems = numberItems;
        if (nextLink) {
            this.AddLink(nextLink, "next", "application/opds+json", false);
        }
        if (prevLink) {
            this.AddLink(prevLink, "previous", "application/opds+json", false);
        }
        if (firstLink) {
            this.AddLink(firstLink, "first", "application/opds+json", false);
        }
        if (lastLink) {
            this.AddLink(lastLink, "last", "application/opds+json", false);
        }
    }
    AddFacet(link, group) {
        if (this.Facets) {
            const found = this.Facets.find((f) => {
                if (f.Metadata && f.Metadata.Title === group) {
                    if (!f.Links) {
                        f.Links = [];
                    }
                    f.Links.push(link);
                    return true;
                }
                return false;
            });
            if (found) {
                return;
            }
        }
        const facet = new opds2_facet_1.OPDSFacet();
        facet.Metadata = new opds2_metadata_1.OPDSMetadata();
        facet.Metadata.Title = group;
        facet.Links = [];
        facet.Links.push(link);
        if (!this.Facets) {
            this.Facets = [];
        }
        this.Facets.push(facet);
    }
    AddPublicationInGroup(publication, collLink) {
        if (this.Groups) {
            const found1 = this.Groups.find((g) => {
                if (g.Links) {
                    const found2 = g.Links.find((l) => {
                        if (l.Href === collLink.Href) {
                            if (!g.Publications) {
                                g.Publications = [];
                            }
                            g.Publications.push(publication);
                            return true;
                        }
                        return false;
                    });
                    if (found2) {
                        return true;
                    }
                }
                return false;
            });
            if (found1) {
                return;
            }
        }
        const group = new opds2_group_1.OPDSGroup();
        group.Metadata = new opds2_metadata_1.OPDSMetadata();
        group.Metadata.Title = collLink.Title;
        group.Publications = [];
        group.Publications.push(publication);
        const linkSelf = new opds2_link_1.OPDSLink();
        linkSelf.AddRel("self");
        linkSelf.Title = collLink.Title;
        linkSelf.Href = collLink.Href;
        group.Links = [];
        group.Links.push(linkSelf);
        if (!this.Groups) {
            this.Groups = [];
        }
        this.Groups.push(group);
    }
    AddNavigationInGroup(link, collLink) {
        if (this.Groups) {
            const found1 = this.Groups.find((g) => {
                if (g.Links) {
                    const found2 = g.Links.find((l) => {
                        if (l.Href === collLink.Href) {
                            if (!g.Navigation) {
                                g.Navigation = [];
                            }
                            g.Navigation.push(link);
                            return true;
                        }
                        return false;
                    });
                    if (found2) {
                        return true;
                    }
                }
                return false;
            });
            if (found1) {
                return;
            }
        }
        const group = new opds2_group_1.OPDSGroup();
        group.Metadata = new opds2_metadata_1.OPDSMetadata();
        group.Metadata.Title = collLink.Title;
        group.Navigation = [];
        group.Navigation.push(link);
        const linkSelf = new opds2_link_1.OPDSLink();
        linkSelf.AddRel("self");
        linkSelf.Title = collLink.Title;
        linkSelf.Href = collLink.Href;
        group.Links = [];
        group.Links.push(link);
        if (!this.Groups) {
            this.Groups = [];
        }
        this.Groups.push(group);
    }
    _OnDeserialized() {
        if (!this.Metadata) {
            console.log("OPDS2Feed.Metadata is not set!");
        }
        if (!this.Links) {
            console.log("OPDS2Feed.Links is not set!");
        }
        if (!this.Publications && !this.Navigation && !this.Groups) {
            console.log("One of OPDS2Feed.Publications|Navigation|Groups must be set!");
        }
    }
};
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("@context"),
    ta_json_x_1.JsonElementType(String),
    ta_json_x_1.JsonConverter(ta_json_string_converter_1.JsonStringConverter),
    tslib_1.__metadata("design:type", Array)
], OPDSFeed.prototype, "Context", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("metadata"),
    tslib_1.__metadata("design:type", opds2_metadata_1.OPDSMetadata)
], OPDSFeed.prototype, "Metadata", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("links"),
    ta_json_x_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSFeed.prototype, "Links", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("publications"),
    ta_json_x_1.JsonElementType(opds2_publication_1.OPDSPublication),
    tslib_1.__metadata("design:type", Array)
], OPDSFeed.prototype, "Publications", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("navigation"),
    ta_json_x_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSFeed.prototype, "Navigation", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("facets"),
    ta_json_x_1.JsonElementType(opds2_facet_1.OPDSFacet),
    tslib_1.__metadata("design:type", Array)
], OPDSFeed.prototype, "Facets", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("groups"),
    ta_json_x_1.JsonElementType(opds2_group_1.OPDSGroup),
    tslib_1.__metadata("design:type", Array)
], OPDSFeed.prototype, "Groups", void 0);
tslib_1.__decorate([
    ta_json_x_1.OnDeserialized(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSFeed.prototype, "_OnDeserialized", null);
OPDSFeed = tslib_1.__decorate([
    ta_json_x_1.JsonObject()
], OPDSFeed);
exports.OPDSFeed = OPDSFeed;
//# sourceMappingURL=opds2.js.map