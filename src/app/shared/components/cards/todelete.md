<section class="font-kl-content py-10 md:py-16 lg:py-20">
  <!-- HERO -->
  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
    <!-- TITLE -->
    <header
      class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
    >
      L'excellence
      <br class="hidden md:block" />
      professionnelle au service du
      <span class="text-kl-red-light">Sénégal</span>
    </header>

    <!-- DESCRIPTION -->
    <p
      class="text-kl-muted mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
      aliquid, expedita sequi culpa ducimus nihil vero modi beatae cum quasi.
    </p>

    <!-- SEARCH -->
    <div class="mt-8 flex justify-center">
      <form
        class="flex w-full max-w-md sm:max-w-lg md:max-w-xl flex-col sm:flex-row overflow-hidden rounded-md shadow-md"
      >
        <input
          type="search"
          placeholder="Entreprise"
          class="text-kl-muted w-full flex-1 border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-kl-primary-red focus:ring-2 focus:ring-kl-primary-red/30"
        />

        <app-button
          variant="primary"
          class="w-full sm:w-auto px-4 py-2 text-sm font-medium whitespace-nowrap"
        >
          Rechercher
        </app-button>
      </form>
    </div>
  </div>

  <!-- ABOUT SECTION -->
  <div class="mt-16 bg-gray-600 px-4 py-10 sm:px-6 lg:px-8">
    <!-- HEADER -->
    <div class="mx-auto max-w-4xl">
      <small class="text-kl-red-light font-bold">NOTRE MISSION</small>
      <h3
        class="text-kl-text mt-2 mb-10 text-xl sm:text-2xl md:text-3xl font-bold"
      >
        Construire l'avenir du Travail
      </h3>
    </div>

    <!-- CARDS CONTAINER -->
    <div
      class="mx-auto w-full max-w-6xl sm:grid-cols-2 md:grid-cols-3 grid gap-6 [grid-cols:repeat(auto-fit,minmax(250px,1fr))]"
    >
      <app-cards
        title="Egalité"
        descripiton="Nous luttons contre les barrières invisibles pour garantir que chaque talent a sa chance, peu importe son parcours."
      >
        <lucide-icon name="scale" [size]="25" color="#97001b"></lucide-icon>
      </app-cards>

      <app-cards
        title="Professionnalisme"
        descripiton="Un standard d'excellence pour les recruteurs comme pour les candidats, assurant des recrutements de qualité."
      >
        <lucide-icon name="user-star" [size]="25" color="#97001b"></lucide-icon>
      </app-cards>

      <app-cards
        title="Impact"
        descripiton="Réduire le chômage structurel en connectant efficacement les compétences aux besoins réels du marché."
      >
        <lucide-icon
          name="trending-up"
          [size]="25"
          color="#97001b"
        ></lucide-icon>
      </app-cards>
    </div>
  </div>

  <!-- POSTS SECTION -->
  <div class="mt-16 bg-gray-600 px-4 py-10 sm:px-6 lg:px-8">
    <!-- HEADER -->
    <div class="mx-auto max-w-4xl">
      <small class="text-kl-red-light font-bold">Opportunités récentes</small>
      <h3
        class="text-kl-text mt-2 mb-10 text-xl sm:text-2xl md:text-3xl font-bold"
      >
        Postes en vedette à Dakar
      </h3>
    </div>

    <!-- CARD GRID -->
    <div
      class="mx-auto w-full max-w-6xl grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
    >
      <!-- CARD -->
      <div
        class="group flex h-full w-full flex-col gap-4 rounded-md border border-transparent bg-kl-card-surface p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-kl-card-hover cursor-pointer"
      >
        <!-- HEADER -->
        <div class="flex items-start justify-between">
          <div
            class="w-fit rounded-lg bg-kl-red-100 p-3 transition-transform duration-300 group-hover:scale-110"
          >
            <lucide-icon
              name="trending-up"
              [size]="25"
              color="#97001b"
            ></lucide-icon>
          </div>

          <span
            class="rounded-md bg-kl-secondary-red-dark px-2 py-1 text-xs font-semibold text-white"
          >
            NOUVEAU
          </span>
        </div>

        <!-- TITLE -->
        <h3
          class="text-kl-text text-lg font-bold group-hover:text-kl-red-light transition-colors"
        >
          Analyste Financier Senior
        </h3>

        <!-- COMPANY -->
        <p class="text-sm text-kl-muted">Banque de l'Habitat du Sénégal</p>

        <!-- LOCATION -->
        <p class="text-sm text-kl-muted mt-auto">Thiès • Dakar</p>
      </div>
    </div>
  </div>
</section>
