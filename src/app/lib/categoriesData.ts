// lib/categoriesData.ts

/**
 * Μοντέλο Κατηγορίας με βελτιωμένους τύπους
 */
export interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    productCount: number;
    isActive?: boolean;
    parentId?: number | null;
    order?: number;
    description?: string | null;
  }
  
  /**
   * Δοκιμαστικά δεδομένα Melisa με προσθήκη εικόνων για πληρότητα
   */
  export const melisaCategories: Category[] = [
    { 
      id: 1, 
      name: "Ξηροί Καρποί", 
      slug: "xiroi-karpoi", 
      productCount: 12, 
      image: "/placeholders/nuts.jpg",
      isActive: true,
      description: "Ποιοτικοί ξηροί καρποί με υψηλή διατροφική αξία"
    },
    { 
      id: 2, 
      name: "Αποξηραμένα Φρούτα", 
      slug: "apoxiremena-frouta", 
      productCount: 9, 
      image: "/placeholders/dried-fruits.jpg",
      isActive: true
    },
    { 
      id: 3, 
      name: "Superfoods", 
      slug: "superfoods", 
      productCount: 5, 
      image: "/placeholders/superfoods.jpg",
      isActive: true
    },
    { 
      id: 4, 
      name: "Μπάρες και Granola", 
      slug: "mpares-kai-granola", 
      productCount: 4, 
      image: "/placeholders/granola.jpg",
      isActive: true
    },
    { 
      id: 5, 
      name: "Φρέσκοι Χυμοί", 
      slug: "freskoi-xymoi", 
      productCount: 6, 
      image: "/placeholders/juices.jpg",
      isActive: true
    },
    { 
      id: 6, 
      name: "Καφέδες", 
      slug: "kafedes", 
      productCount: 3, 
      image: "/placeholders/coffee.jpg",
      isActive: true
    },
    { 
      id: 7, 
      name: "Κρασιά", 
      slug: "krasia", 
      productCount: 5, 
      image: "/placeholders/wines.jpg",
      isActive: true
    },
    { 
      id: 8, 
      name: "Καλάθια Δώρων", 
      slug: "kalathia-doron", 
      productCount: 4, 
      image: "/placeholders/gift-baskets.jpg",
      isActive: true
    },
    { 
      id: 9, 
      name: "Εποχιακά Γλυκά", 
      slug: "epoxiaka-glyka", 
      productCount: 2, 
      image: "/placeholders/seasonal-sweets.jpg",
      isActive: true
    },
    { 
      id: 10, 
      name: "Βελγικές Τρούφες", 
      slug: "velgikes-troufes", 
      productCount: 3, 
      image: "/placeholders/truffles.jpg",
      isActive: true
    },
    { 
      id: 11, 
      name: "Γλυκά του Κουταλιού", 
      slug: "glyka-tou-koutaliou", 
      productCount: 2, 
      image: "/placeholders/spoon-sweets.jpg",
      isActive: true
    },
    { 
      id: 12, 
      name: "Μαρμελάδες", 
      slug: "marmelades", 
      productCount: 3, 
      image: "/placeholders/jams.jpg",
      isActive: true
    },
    { 
      id: 13, 
      name: "Μέλια", 
      slug: "melia", 
      productCount: 6, 
      image: "/placeholders/honey.jpg",
      isActive: true
    },
    { 
      id: 14, 
      name: "Παραδοσιακά Γλυκά", 
      slug: "paradosiaka-glyka", 
      productCount: 5, 
      image: "/placeholders/traditional-sweets.jpg",
      isActive: true
    },
    { 
      id: 15, 
      name: "Κάβα Ποτών", 
      slug: "kava-poton", 
      productCount: 7, 
      image: "/placeholders/spirits.jpg",
      isActive: true
    },
    { 
      id: 16, 
      name: "Νέα Συλλογή", 
      slug: "nea-syllogi", 
      productCount: 0, 
      image: null,
      isActive: false,
      description: "Προσεχώς νέα συλλογή προϊόντων"
    },
  ];
  
  /**
   * Εισαγωγή της γενικής λειτουργίας καθυστέρησης από το utils
   * (αυτό θα μπορούσε να είναι σε ξεχωριστό αρχείο: lib/utils/delay.ts)
   */
  export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Τύπος για παραμέτρους αναζήτησης κατηγοριών
   */
  export interface CategorySearchParams {
    query?: string;
    isActive?: boolean;
    parentId?: number | null;
    minProductCount?: number;
    maxProductCount?: number;
    sortBy?: 'name' | 'productCount' | 'id';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
  }
  
  /**
   * Τύπος για δημιουργία νέας κατηγορίας (χωρίς id)
   */
  export type CategoryCreateInput = Omit<Category, 'id' | 'productCount'> & { 
    productCount?: number 
  };
  
  /**
   * Τύπος για ενημέρωση υπάρχουσας κατηγορίας
   */
  export type CategoryUpdateInput = Partial<Omit<Category, 'id'>> & { id: number };
  
  /**
   * Τύπος απάντησης με pagination
   */
  export interface CategoryPaginatedResponse {
    items: Category[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  /**
   * Mock API: Λήψη όλων των κατηγοριών με προηγμένες επιλογές φιλτραρίσματος και ταξινόμησης
   */
  export const mockFetchCategories = async (params: CategorySearchParams = {}): Promise<CategoryPaginatedResponse> => {
    await delay(300);
  
    let filtered = [...melisaCategories];
  
    // Εφαρμογή φίλτρων
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.slug.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query))
      );
    }
  
    if (params.isActive !== undefined) {
      filtered = filtered.filter(c => c.isActive === params.isActive);
    }
  
    if (params.parentId !== undefined) {
      filtered = filtered.filter(c => c.parentId === params.parentId);
    }
  
    if (params.minProductCount !== undefined) {
      filtered = filtered.filter(c => c.productCount >= params.minProductCount);
    }
  
    if (params.maxProductCount !== undefined) {
      filtered = filtered.filter(c => c.productCount <= params.maxProductCount);
    }
  
    // Εφαρμογή ταξινόμησης
    if (params.sortBy) {
      const sortOrder = params.sortOrder === 'desc' ? -1 : 1;
      filtered.sort((a, b) => {
        if (params.sortBy === 'name') {
          return sortOrder * a.name.localeCompare(b.name);
        } else if (params.sortBy === 'productCount') {
          return sortOrder * (a.productCount - b.productCount);
        } else {
          return sortOrder * (a.id - b.id);
        }
      });
    }
  
    // Υπολογισμός συνολικών αποτελεσμάτων πριν από το pagination
    const total = filtered.length;
  
    // Εφαρμογή pagination
    const limit = params.limit || total;
    const offset = params.offset || 0;
    const paginatedItems = filtered.slice(offset, offset + limit);
    const currentPage = offset / limit + 1;
    const totalPages = Math.ceil(total / limit);
  
    return {
      items: paginatedItems,
      total,
      page: currentPage,
      limit,
      totalPages
    };
  };
  
  /**
   * Mock API: Λήψη κατηγορίας με βάση το ID
   */
  export const mockFetchCategoryById = async (id: number): Promise<Category | null> => {
    await delay(300);
    return melisaCategories.find(c => c.id === id) || null;
  };
  
  /**
   * Mock API: Λήψη κατηγορίας με βάση το slug
   */
  export const mockFetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
    await delay(300);
    return melisaCategories.find(c => c.slug === slug) || null;
  };
  
  /**
   * Mock API: Προσθήκη νέας κατηγορίας
   */
  export const mockCreateCategory = async (data: CategoryCreateInput): Promise<Category> => {
    await delay(500);
    
    // Δημιουργία νέου ID (αύξουσα αρίθμηση)
    const maxId = Math.max(...melisaCategories.map(c => c.id), 0);
    const newId = maxId + 1;
    
    // Δημιουργία νέας κατηγορίας
    const newCategory: Category = {
      id: newId,
      name: data.name,
      slug: data.slug,
      image: data.image || null,
      productCount: data.productCount || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      parentId: data.parentId || null,
      order: data.order || 0,
      description: data.description || null
    };
    
    melisaCategories.push(newCategory);
    return newCategory;
  };
  
  /**
   * Mock API: Ενημέρωση υπάρχουσας κατηγορίας
   */
  export const mockUpdateCategory = async (data: CategoryUpdateInput): Promise<Category | null> => {
    await delay(500);
    
    const index = melisaCategories.findIndex(c => c.id === data.id);
    
    if (index === -1) {
      return null;
    }
    
    // Ενημέρωση μόνο των πεδίων που παρέχονται
    melisaCategories[index] = {
      ...melisaCategories[index],
      ...data
    };
    
    return melisaCategories[index];
  };
  
  /**
   * Mock API: Διαγραφή κατηγορίας
   */
  export const mockDeleteCategory = async (id: number): Promise<boolean> => {
    await delay(500);
    
    const index = melisaCategories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return false;
    }
    
    melisaCategories.splice(index, 1);
    return true;
  };
  
  /**
   * Mock API: Έλεγχος αν υπάρχει slug
   */
  export const mockCheckSlugExists = async (slug: string, excludeId?: number): Promise<boolean> => {
    await delay(200);
    
    return melisaCategories.some(c => c.slug === slug && c.id !== excludeId);
  };
  
  /**
   * Mock API: Ενημέρωση σειράς εμφάνισης κατηγοριών (batch update)
   */
  export const mockUpdateCategoryOrder = async (updates: { id: number; order: number }[]): Promise<boolean> => {
    await delay(500);
    
    updates.forEach(update => {
      const index = melisaCategories.findIndex(c => c.id === update.id);
      if (index !== -1) {
        melisaCategories[index].order = update.order;
      }
    });
    
    return true;
  };
  
  /**
   * Helper: Δημιουργία slug από string (transliteration)
   */
  export const generateCategorySlug = (input: string): string => {
    return input
      .toLowerCase()
      .replace(/[άΆαΑ]/g, "a")
      .replace(/[έΈεΕ]/g, "e")
      .replace(/[ήΉηΗ]/g, "i")
      .replace(/[ίΊϊΐιΙ]/g, "i")
      .replace(/[όΌοΟ]/g, "o")
      .replace(/[ύΎϋΰυΥ]/g, "y")
      .replace(/[ώΏωΩ]/g, "o")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "")
      .replace(/-+/g, "-") // Αφαιρεί πολλαπλές παύλες
      .replace(/^-|-$/g, ""); // Αφαιρεί παύλες στην αρχή και στο τέλος
  };