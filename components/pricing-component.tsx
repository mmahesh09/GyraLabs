import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Best for trying the platform",
      features: [
        "5 credits included",
        "Text-to-agent creation",
        "Live workflow generation",
        "Basic execution logs",
        "Community support"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: isAnnual ? "₹999" : "₹99",
      description: "For builders and startups",
      features: [
        "100 credits per month",
        "Advanced workflow execution",
        "Real-time logs & debugging",
        "Agent configuration controls",
        "Priority support"
      ],
      cta: "Upgrade to Pro",
      highlighted: true
    },
    {
      name: "Team",
      price: isAnnual ? "₹4,999" : "₹499",
      description: "For teams building together",
      features: [
        "500 credits per month",
        "Team workspace",
        "Role-based access control",
        "Shared agents & workflows",
        "Detailed usage analytics",
        "Priority support"
      ],
      cta: "Start Team Plan",
      highlighted: false
    }
  ];

  return (
    <div className="bg-white dark:bg-black mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Simple, Usage-Based Pricing
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            Pay only when your agents run. No hidden limits.
          </p>

          <div className="inline-flex items-center bg-black/[0.03] dark:bg-white/[0.03] rounded-full p-1">
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                !isAnnual
                  ? 'bg-black/[0.07] dark:bg-white/[0.07] text-black dark:text-white'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                isAnnual
                  ? 'bg-black/[0.07] dark:bg-white/[0.07] text-black dark:text-white'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual <span className="ml-1 text-xs">(Save ~20%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.highlighted
                  ? 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] scale-[1.02] shadow-xl'
                  : 'border-black/[0.08] dark:border-white/[0.08]'
              } p-6 transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-black dark:text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "₹0" && (
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-black/40 dark:text-white/40" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'border border-black/10 dark:border-white/10 text-black dark:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-10">
          Credits are used only when workflows run. Cost is shown before execution.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
