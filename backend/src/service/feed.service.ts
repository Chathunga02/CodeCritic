import { feedRepository } from "../repository/feed.repository.js";
import { FeedQuery } from "../models/feed.model.js";

class FeedService {
  async getPublicFeed(query: FeedQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    let technologiesArray: string[] | undefined;
    if (query.technologies) {
      technologiesArray = query.technologies.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
    }

    const [items, totalItems] = await feedRepository.getPublicFeed(skip, limit, query.search, technologiesArray);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
      }
    };
  }
}

export const feedService = new FeedService();
