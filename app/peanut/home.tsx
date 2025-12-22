"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot, Sparkles, Zap, Brain, Globe, Code, MessageSquare, ArrowRight, CheckCircle2,
    Loader2, Terminal, Sliders, ChevronDown, Play, Square, Pause,
    Workflow, Settings, FileJson, Activity, CreditCard, LayoutDashboard, ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { FluidDropdown } from "@/components/fluid-dropdown";

// Types for our Agent configuration
type AgentCapability = 'web_search' | 'code_execution' | 'image_gen' | 'data_analysis';

interface WorkflowNode {
    id: string;
    type: 'trigger' | 'action' | 'condition';
    label: string;
    status?: 'pending' | 'running' | 'completed' | 'failed';
    logs?: string[];
    output?: string;
    description?: string;
}

interface AgentConfig {
    name: string;
    role: string;
    capabilities: AgentCapability[];
    model: string;
    complexity: 'Simple' | 'Advanced' | 'Expert';
    systemPrompt: string;
    workflow: WorkflowNode[];
}

const MODELS = ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro", "Llama 3.1"];

const AgentBuilder = () => {
    const [prompt, setPrompt] = useState('');
    const [isBuilding, setIsBuilding] = useState(false);
    const [builtAgent, setBuiltAgent] = useState<AgentConfig | null>(null);
    const [buildStep, setBuildStep] = useState(0);
    const [selectedModel, setSelectedModel] = useState(MODELS[0]);
    const [creativity, setCreativity] = useState(0.7);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'config' | 'logs'>('overview');
    const [isRunning, setIsRunning] = useState(false);
    const [credits, setCredits] = useState(2500);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const logsEndRef = useRef<HTMLDivElement>(null);

    // Mock function to analyze prompt and "build" agent
    const generateAgent = () => {
        if (!prompt.trim()) return;

        setIsBuilding(true);
        setBuiltAgent(null);
        setBuildStep(0);
        setTerminalLogs(["Initializing agent build process...", "Parsing user intent..."]);

        // Simulate build steps
        const steps = [
            () => {
                setBuildStep(1);
                addLog("Analyzing requirements...");
                addLog("Identifying core capabilities...");
            },
            () => {
                setBuildStep(2);
                addLog(`Selecting optimized model: ${selectedModel}...`);
                addLog("Designing system architecture...");
            },
            () => {
                setBuildStep(3);
                addLog("Configuring guardrails...");
                addLog("Validating permission sets...");
            },
        ];

        steps.forEach((step, index) => {
            setTimeout(step, (index + 1) * 1200);
        });

        // Add random logs for effect
        const randomLogs = ["Optimizing context window...", "Injecting knowledge base...", "Running safety checks...", "Compiling system prompt..."];
        randomLogs.forEach((log, i) => {
            setTimeout(() => addLog(log), 500 + (i * 800));
        });

        setTimeout(() => {
            // Simple heuristic keywords
            const caps: AgentCapability[] = [];
            if (prompt.includes('search') || prompt.includes('browse')) caps.push('web_search');
            if (prompt.includes('code') || prompt.includes('program')) caps.push('code_execution');
            if (prompt.includes('image') || prompt.includes('draw')) caps.push('image_gen');
            if (prompt.includes('data') || prompt.includes('analyze')) caps.push('data_analysis');
            if (caps.length === 0) caps.push('data_analysis'); // default

            // Dynamic Workflow Construction
            const workflow: WorkflowNode[] = [
                { id: '1', type: 'trigger', label: 'User Trigger', status: 'pending', description: 'Receives the initial request from the user interface.', logs: [] },
                { id: '2', type: 'condition', label: 'Intent Classification', status: 'pending', description: 'Analyzes the user input to determine the required action path.', logs: [] }
            ];

            if (caps.includes('web_search')) {
                workflow.push({ id: '3', type: 'action', label: 'Web Search', status: 'pending', description: 'Querying external search engines for real-time information.', logs: [] });
            }
            if (caps.includes('code_execution')) {
                workflow.push({ id: '4', type: 'action', label: 'Execute Code', status: 'pending', description: 'Running Python/JS code in a sandboxed environment.', logs: [] });
            }
            if (caps.includes('image_gen')) {
                workflow.push({ id: '5', type: 'action', label: 'Generate Image', status: 'pending', description: 'Calling DALL-E or Stable Diffusion API.', logs: [] });
            }

            workflow.push({ id: 'final', type: 'action', label: 'Synthesize Response', status: 'pending', description: 'Compiling all gathered data into a final natural language response.', logs: [] });

            setBuiltAgent({
                name: prompt.split(' ').slice(0, 2).join(' ') + 'Bot' || 'Agent-01',
                role: 'Assistant',
                capabilities: caps,
                model: selectedModel,
                complexity: caps.length > 2 ? 'Expert' : 'Advanced',
                systemPrompt: `You are a helper agent designed to assist with ${caps.join(', ')}. \nYour goal is to accurately and efficiently execute tasks provided by the user.`,
                workflow: workflow
            });
            addLog("Build complete. Agent ready.");
            setIsBuilding(false);
            setActiveTab('overview');
        }, 4500);
    };

    const [executionResult, setExecutionResult] = useState<string | null>(null);

    const runWorkflow = async () => {
        if (!builtAgent) return;
        setIsRunning(true);
        setExecutionResult(null);
        addLog("Initializing automated workflow engine...");
        setActiveTab('workflow'); // Auto switch to visualize

        // Reset
        let currentWorkflow: WorkflowNode[] = builtAgent.workflow.map(n => ({ ...n, status: 'pending', logs: [], output: undefined }));
        const updateWorkflowState = (wf: WorkflowNode[]) => {
            setBuiltAgent(prev => prev ? { ...prev, workflow: wf } : null);
        };
        updateWorkflowState(currentWorkflow);
        setCredits(prev => prev - 15);

        // Async Execution Loop
        for (let i = 0; i < currentWorkflow.length; i++) {
            if (!isRunning && i > 0) break; // Allow stopping? (Logic simplified for async loop)

            // 1. Start Node
            currentWorkflow[i] = { ...currentWorkflow[i], status: 'running' };
            updateWorkflowState([...currentWorkflow]);

            const node = currentWorkflow[i];
            const nodeLog = (msg: string) => {
                currentWorkflow[i].logs?.push(`[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`);
                addLog(`[${node.label}] ${msg}`); // Also logs to main terminal
                updateWorkflowState([...currentWorkflow]);
            };

            nodeLog("Initializing step...");

            // Simulate processing time
            await new Promise(r => setTimeout(r, 1500));

            // Simulate specific logic
            try {
                if (node.label.includes("User")) {
                    currentWorkflow[i].output = `Input: "${prompt}"`;
                    nodeLog("Input received successfully.");
                } else if (node.label.includes("Intent")) {
                    currentWorkflow[i].output = "Intent: Analyzed";
                    nodeLog("Intent confidence score: 0.98");
                } else if (node.label.includes("Search")) {
                    nodeLog("Connecting to Google Search API...");
                    await new Promise(r => setTimeout(r, 1000));
                    currentWorkflow[i].output = "Found 5 relevant sources.";
                    nodeLog("Data parsed from 5 sources.");
                } else if (node.label.includes("Code")) {
                    nodeLog("Provisioning sandbox environment...");
                    await new Promise(r => setTimeout(r, 800));
                    nodeLog("Executing script...");
                    currentWorkflow[i].output = "Execution successful. Stdout: Hello World";
                } else if (node.label.includes("Response")) {
                    nodeLog("Formatting final output...");
                    currentWorkflow[i].output = "Response generated.";
                }

                currentWorkflow[i].status = 'completed';
                nodeLog("Step completed successfully.");
            } catch (e) {
                currentWorkflow[i].status = 'failed';
                nodeLog("Error executing step.");
            }

            updateWorkflowState([...currentWorkflow]);
            await new Promise(r => setTimeout(r, 500)); // Pause between nodes
        }

        setIsRunning(false);
        setExecutionResult("Workflow execution completed successfully. All outputs have been aggregated.");
        addLog("Workflow execution finished.");
    };

    const addLog = (msg: string) => {
        setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`]);
    };

    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [terminalLogs]);


    // Typing effect for suggestions
    const typeSuggestion = (text: string) => {
        setPrompt("");
        let i = 0;
        const interval = setInterval(() => {
            setPrompt(prev => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 20);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0f0c] text-white font-sans selection:bg-purple-500/30">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-2"
                        >
                            <Sparkles size={14} />
                            <span>AI Agent Builder 3.0</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold"
                        >
                            Describe it. <span className="text-purple-400">Build it.</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900/80 border border-white/10 rounded-xl">
                            <CreditCard size={16} className="text-neutral-400" />
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-xs text-neutral-500">Credits</span>
                                <span className="font-mono font-bold text-white">{credits}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Interface Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Input (4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* Premium Input Section */}
                        <div className="space-y-4">
                            {/* Model & Config Header */}
                            <div className="flex justify-between items-center px-2">
                                <div className="relative z-20">
                                    <FluidDropdown
                                        items={[
                                            { id: "GPT-4o", label: "GPT-4o", icon: Sparkles, color: "#10a37f" },
                                            { id: "Claude 3.5 Sonnet", label: "Claude 3.5 Sonnet", icon: Brain, color: "#d97757" },
                                            { id: "Gemini 1.5 Pro", label: "Gemini 1.5 Pro", icon: Zap, color: "#4285f4" },
                                            { id: "Llama 3.1", label: "Llama 3.1", icon: Terminal, color: "#4f46e5" },
                                        ]}
                                        selectedItem={{
                                            id: selectedModel,
                                            label: selectedModel,
                                            icon: selectedModel.includes("Claude") ? Brain : selectedModel.includes("Gemini") ? Zap : selectedModel.includes("Llama") ? Terminal : Sparkles,
                                            color: selectedModel.includes("Claude") ? "#d97757" : selectedModel.includes("Gemini") ? "#4285f4" : selectedModel.includes("Llama") ? "#4f46e5" : "#10a37f"
                                        }}
                                        onSelect={(item) => setSelectedModel(item.id)}
                                        className="w-[180px]"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 text-xs text-neutral-500 bg-white/5 rounded-full px-3 py-1">
                                        <Zap size={12} className={prompt.length > 50 ? "text-yellow-500" : "text-neutral-600"} />
                                        <span>{prompt.length > 50 ? "Strong" : "Weak"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Input Area */}
                            <div className="relative">
                                <VercelV0Chat
                                    value={prompt}
                                    onChange={setPrompt}
                                    onSubmit={generateAgent}
                                    disabled={isBuilding}
                                    className="w-full shadow-2xl"
                                    placeholder="Describe the agent you want to build..."
                                />
                            </div>

                            {/* Advanced / Creativity Toggle (Simplified) */}
                            <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs text-neutral-400">
                                    <div className="flex items-center gap-2">
                                        <Sliders size={12} />
                                        <span>Creativity Level</span>
                                    </div>
                                    <span>{Math.round(creativity * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="1" step="0.1"
                                    value={creativity}
                                    onChange={(e) => setCreativity(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>
                        </div>

                        {/* Recent Executions / Suggestions */}
                        <div className="mt-8 px-2">
                            <h3 className="text-xs font-medium text-neutral-500 mb-3 uppercase tracking-wider ml-1">Example Templates</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Finance Analyst', 'Code Reviewer', 'Travel Planner', 'SEO Specialist', 'Legal Assistant'].map((sug, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setPrompt(`Create a ${sug} agent that helps with...`);
                                            // Focus logic could go here if we had a ref to the chat input exposed
                                        }}
                                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-500/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                    >
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Output / Visualization (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-7 relative min-h-[600px]"
                    >
                        <AnimatePresence mode="wait">

                            {/* State: Empty / Idle / Draft Preview */}
                            {!isBuilding && !builtAgent && (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl p-12 text-center bg-black/20"
                                >
                                    {!prompt ? (
                                        <>
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                                                <Bot size={40} className="text-purple-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Initialize New Agent</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-lg">
                                                {[
                                                    { icon: MessageSquare, title: "Describe", desc: "Explain your agent's purpose in plain English" },
                                                    { icon: Sliders, title: "Customize", desc: "Adjust creativity and model settings" },
                                                    { icon: Zap, title: "Deploy", desc: "Launch and test your workflow instantly" }
                                                ].map((step, i) => (
                                                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                                                        <step.icon size={20} className="text-neutral-400" />
                                                        <span className="text-sm font-medium text-neutral-300">{step.title}</span>
                                                        <span className="text-[10px] text-neutral-500 leading-tight">{step.desc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col">
                                            <div className="text-left w-full mb-6 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-xs font-mono text-green-400 uppercase tracking-wider">Live Analysis</span>
                                                </div>
                                                {/* Simulated AI Typing Indicator */}
                                                <div className="flex gap-1">
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1 h-1 rounded-full bg-neutral-500" />
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1 h-1 rounded-full bg-neutral-500" />
                                                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1 h-1 rounded-full bg-neutral-500" />
                                                </div>
                                            </div>

                                            <div className="flex-1 w-full bg-neutral-900/50 rounded-2xl border border-white/10 p-6 text-left relative overflow-hidden flex flex-col gap-6">

                                                {/* 1. Detected Identity */}
                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center shrink-0">
                                                        {prompt.toLowerCase().includes('support') ? <MessageSquare size={24} className="text-purple-300" /> :
                                                            prompt.toLowerCase().includes('finance') ? <CreditCard size={24} className="text-green-300" /> :
                                                                prompt.toLowerCase().includes('code') ? <Terminal size={24} className="text-blue-300" /> :
                                                                    <Bot size={24} className="text-white" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white leading-tight">
                                                            {prompt.length < 10 ? "Analyzing..." :
                                                                prompt.toLowerCase().includes('support') ? "Customer Support Agent" :
                                                                    prompt.toLowerCase().includes('finance') ? "Financial Analyst" :
                                                                        prompt.toLowerCase().includes('code') ? "Software Engineer" :
                                                                            prompt.toLowerCase().includes('travel') ? "Travel Planner" :
                                                                                "Custom AI Assistant"}
                                                        </h3>
                                                        <p className="text-xs text-neutral-400 mt-1">Based on your input, this agent will specialize in {
                                                            prompt.toLowerCase().includes('support') ? "handling user inquiries." :
                                                                prompt.toLowerCase().includes('finance') ? "analyzing market data." :
                                                                    prompt.toLowerCase().includes('code') ? "writing and debugging code." :
                                                                        "general task execution."}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* 2. Detected Capabilities (Chips) */}
                                                <div>
                                                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Detected Intent & Capabilities</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/5 px-2 py-1 rounded text-[10px] text-neutral-300 flex items-center gap-1">
                                                            <Brain size={10} className="text-purple-400" /> Context Understanding
                                                        </motion.div>
                                                        {prompt.toLowerCase().includes('web') || prompt.toLowerCase().includes('search') || prompt.toLowerCase().includes('find') ? (
                                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded text-[10px] text-blue-300 flex items-center gap-1">
                                                                <Globe size={10} /> Web Browsing
                                                            </motion.div>
                                                        ) : null}
                                                        {prompt.toLowerCase().includes('image') || prompt.toLowerCase().includes('picture') || prompt.toLowerCase().includes('draw') ? (
                                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-pink-500/10 border border-pink-500/20 px-2 py-1 rounded text-[10px] text-pink-300 flex items-center gap-1">
                                                                <ImageIcon size={10} /> Image Generation
                                                            </motion.div>
                                                        ) : null}
                                                        {prompt.toLowerCase().includes('code') || prompt.toLowerCase().includes('app') ? (
                                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded text-[10px] text-yellow-300 flex items-center gap-1">
                                                                <Code size={10} /> Code Execution
                                                            </motion.div>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {/* 3. Proposed Workflow (Visual Graph) */}
                                                <div className="flex-1 relative border-t border-white/5 pt-4">
                                                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">Proposed Workflow Chain</h4>
                                                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                                        {/* Trigger Node */}
                                                        <div className="px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 text-xs text-neutral-300 flex items-center gap-2 shrink-0">
                                                            <MessageSquare size={12} className="text-green-400" />
                                                            User Query
                                                        </div>
                                                        <ArrowRight size={12} className="text-neutral-600 shrink-0" />

                                                        {/* Dynamic Intermediate Nodes */}
                                                        {prompt.length > 15 && (
                                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 shrink-0">
                                                                <div className="px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 text-xs text-neutral-300 flex items-center gap-2">
                                                                    <Brain size={12} className="text-purple-400" />
                                                                    Analyze Intent
                                                                </div>
                                                                <ArrowRight size={12} className="text-neutral-600" />
                                                            </motion.div>
                                                        )}

                                                        {(prompt.toLowerCase().includes('search') || prompt.toLowerCase().includes('find')) && (
                                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 shrink-0">
                                                                <div className="px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 text-xs text-neutral-300 flex items-center gap-2">
                                                                    <Globe size={12} className="text-blue-400" />
                                                                    Search Web
                                                                </div>
                                                                <ArrowRight size={12} className="text-neutral-600" />
                                                            </motion.div>
                                                        )}

                                                        <div className="px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 text-xs text-neutral-300 flex items-center gap-2 shrink-0 opacity-50">
                                                            <Bot size={12} />
                                                            Response
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* State: Building */}
                            {isBuilding && (
                                <motion.div
                                    key="building"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full bg-neutral-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col"
                                >
                                    <div className="space-y-8 flex-1">
                                        <BuildStep status={buildStep >= 1 ? 'completed' : buildStep === 0 ? 'active' : 'pending'} icon={Brain} text="Analyzing Request" />
                                        <BuildStep status={buildStep >= 2 ? 'completed' : buildStep === 1 ? 'active' : 'pending'} icon={Zap} text="Defining Capabilities" />
                                        <BuildStep status={buildStep >= 3 ? 'completed' : buildStep === 2 ? 'active' : 'pending'} icon={Code} text="Generating System Prompt" />
                                    </div>

                                    <div className="mt-8 bg-black/60 rounded-xl border border-white/10 p-4 font-mono text-xs text-green-400/80 h-48 overflow-hidden relative">
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="flex flex-col gap-1 overflow-y-auto h-full pr-2 custom-scrollbar">
                                            {terminalLogs.map((log, i) => (
                                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="truncate">
                                                    <span className="text-neutral-500 mr-2">{'>'}</span>{log}
                                                </motion.div>
                                            ))}
                                            <div ref={logsEndRef} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* State: Dashboard */}
                            {builtAgent && !isBuilding && (
                                <motion.div
                                    key="dashboard"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-full bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                                >
                                    {/* Dashboard Header */}
                                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                                                <Bot size={24} />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold">{builtAgent.name}</h2>
                                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                    <span>{builtAgent.role}</span>
                                                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                                                    <span>{builtAgent.model}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={isRunning ? () => setIsRunning(false) : runWorkflow}
                                                className={cn(
                                                    "border-white/10 hover:bg-white/5 transition-colors",
                                                    isRunning ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"
                                                )}
                                            >
                                                {isRunning ? <Pause size={14} className="mr-2" /> : <Play size={14} className="mr-2" />}
                                                {isRunning ? 'Stop' : 'Run'}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex border-b border-white/10 px-6">
                                        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={LayoutDashboard} label="Overview" />
                                        <TabButton active={activeTab === 'workflow'} onClick={() => setActiveTab('workflow')} icon={Workflow} label="Workflow" />
                                        <TabButton active={activeTab === 'config'} onClick={() => setActiveTab('config')} icon={Settings} label="Config" />
                                        <TabButton active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} icon={Activity} label="Logs" />
                                    </div>

                                    {/* Tab Content */}
                                    <div className="p-6 flex-1 overflow-y-auto bg-black/10">
                                        {activeTab === 'overview' && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {/* Execution Result Box */}
                                                {executionResult && (
                                                    <div className="p-4 rounded-xl bg-green-900/10 border border-green-500/30 mb-6">
                                                        <div className="flex items-center gap-2 mb-2 text-green-400 font-semibold text-sm">
                                                            <CheckCircle2 size={16} /> Latest Execution Result
                                                        </div>
                                                        <div className="font-mono text-xs text-neutral-300 bg-black/40 p-3 rounded-lg border border-white/5 whitespace-pre-wrap">
                                                            {executionResult}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                        <span className="text-xs text-neutral-500 block mb-1">Status</span>
                                                        <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active
                                                        </div>
                                                    </div>
                                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                                        <span className="text-xs text-neutral-500 block mb-1">Complexity</span>
                                                        <div className="flex items-center gap-2 text-white font-medium text-sm">
                                                            <Zap size={14} className="text-yellow-500" /> {builtAgent.complexity}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Capabilities</h4>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {builtAgent.capabilities.map((cap, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-sm text-neutral-300 bg-white/5 p-3 rounded-lg border border-white/5">
                                                                <CheckCircle2 size={16} className="text-purple-400" />
                                                                <span className="capitalize">{cap.replace('_', ' ')}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'workflow' && (
                                            <div className="h-full flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {/* Left Column: Workflow Chain */}
                                                <div className="w-1/3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                                                    <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Execution Graph</div>
                                                    <div className="relative flex flex-col gap-6 pl-4">
                                                        {/* Vertical Connecting Line */}
                                                        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-neutral-800" />

                                                        {builtAgent.workflow.map((node, i) => (
                                                            <motion.div
                                                                key={node.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                                className="relative z-10"
                                                            >
                                                                <button
                                                                    onClick={() => setSelectedNodeId(node.id)}
                                                                    className={cn(
                                                                        "w-full text-left p-3 rounded-xl border transition-all duration-200 group relative",
                                                                        selectedNodeId === node.id ? "bg-neutral-800 border-purple-500 ring-1 ring-purple-500/50" : "bg-neutral-900 border-white/5 hover:border-white/20",
                                                                        node.status === 'running' && "ring-1 ring-purple-500/50 border-purple-500/50"
                                                                    )}
                                                                >
                                                                    {/* Status Icon Marker */}
                                                                    <div className={cn(
                                                                        "absolute -left-[29px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-neutral-900 transition-colors",
                                                                        node.status === 'completed' ? "border-green-500 text-green-500" :
                                                                            node.status === 'running' ? "border-purple-500 text-purple-500 animate-pulse" :
                                                                                node.status === 'failed' ? "border-red-500 text-red-500" :
                                                                                    "border-neutral-700 text-neutral-700 group-hover:border-neutral-500"
                                                                    )}>
                                                                        {node.status === 'completed' ? <CheckCircle2 size={12} /> :
                                                                            node.status === 'failed' ? <Activity size={12} /> :
                                                                                <div className={cn("w-1.5 h-1.5 rounded-full", node.status === 'running' ? "bg-purple-500" : "bg-neutral-700")} />}
                                                                    </div>

                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <span className={cn("text-sm font-medium", node.status === 'running' ? "text-purple-400" : "text-neutral-200")}>
                                                                            {node.label}
                                                                        </span>
                                                                        <Badge variant="secondary" className="text-[10px] bg-white/5 text-neutral-500 border border-white/5">
                                                                            {node.type}
                                                                        </Badge>
                                                                    </div>
                                                                    <p className="text-[10px] text-neutral-500 truncate">{node.description || "No description provided."}</p>
                                                                </button>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right Column: Node Inspector */}
                                                <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden flex flex-col relative">
                                                    {selectedNodeId ? (
                                                        (() => {
                                                            const node = builtAgent.workflow.find(n => n.id === selectedNodeId);
                                                            if (!node) return null;
                                                            return (
                                                                <div className="h-full flex flex-col">
                                                                    {/* Header */}
                                                                    <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className={cn(
                                                                                "w-8 h-8 rounded-lg flex items-center justify-center border",
                                                                                node.status === 'completed' ? "bg-green-500/10 border-green-500/30 text-green-400" :
                                                                                    node.status === 'running' ? "bg-purple-500/10 border-purple-500/30 text-purple-400" :
                                                                                        "bg-white/5 border-white/10 text-neutral-400"
                                                                            )}>
                                                                                <Workflow size={14} />
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="text-sm font-bold text-white">{node.label}</h3>
                                                                                <span className="text-xs text-neutral-500 capitalize">{node.status || 'Pending'}</span>
                                                                            </div>
                                                                        </div>
                                                                        <Badge variant="outline" className="border-white/10 text-neutral-400 font-mono text-xs">ID: {node.id}</Badge>
                                                                    </div>

                                                                    {/* Scrollable Content */}
                                                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                                                        {/* Description */}
                                                                        <div>
                                                                            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Description</h4>
                                                                            <p className="text-sm text-neutral-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                                                                                {node.description}
                                                                            </p>
                                                                        </div>

                                                                        {/* Execution Logs */}
                                                                        <div>
                                                                            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Step Logs</h4>
                                                                            <div className="bg-black/40 rounded-lg border border-white/5 p-3 font-mono text-xs min-h-[100px] max-h-[200px] overflow-y-auto custom-scrollbar">
                                                                                {node.logs && node.logs.length > 0 ? (
                                                                                    node.logs.map((log, i) => (
                                                                                        <div key={i} className="text-neutral-400 border-b border-white/5 last:border-0 py-1">
                                                                                            {log}
                                                                                        </div>
                                                                                    ))
                                                                                ) : (
                                                                                    <span className="text-neutral-600 italic">No logs generated for this step yet...</span>
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                        {/* Node Output */}
                                                                        <div>
                                                                            <div className="flex justify-between items-center mb-2">
                                                                                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Output Data</h4>
                                                                                <span className="text-[10px] text-neutral-600 bg-white/5 px-2 py-0.5 rounded">JSON/Text</span>
                                                                            </div>
                                                                            <div className="bg-black/40 rounded-lg border border-white/5 p-4 font-mono text-xs text-green-400/80 overflow-x-auto">
                                                                                {node.output ? (
                                                                                    <pre>{node.output}</pre>
                                                                                ) : (
                                                                                    <span className="text-neutral-600 italic">Waiting for execution...</span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })()
                                                    ) : (
                                                        <div className="h-full flex flex-col items-center justify-center text-neutral-500 gap-4">
                                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                                                <Workflow size={32} className="opacity-50" />
                                                            </div>
                                                            <p className="text-sm">Select a node from the graph to view details.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'config' && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-neutral-400 uppercase">System Prompt</label>
                                                    <textarea
                                                        className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-mono text-neutral-300 focus:outline-none focus:border-purple-500/50 resize-none"
                                                        defaultValue={builtAgent.systemPrompt}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-neutral-400 uppercase">Execution Limits</label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center">
                                                            <span className="text-sm text-neutral-300">Max Steps</span>
                                                            <span className="text-sm font-mono">50</span>
                                                        </div>
                                                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center">
                                                            <span className="text-sm text-neutral-300">Timeout</span>
                                                            <span className="text-sm font-mono">30s</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'logs' && (
                                            <div className="h-full bg-black rounded-xl border border-white/10 p-4 font-mono text-xs text-neutral-300 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {terminalLogs.map((log, i) => (
                                                    <div key={i} className="mb-1 border-b border-white/5 pb-1">
                                                        <span className="text-neutral-500 mr-2">{log.split(']')[0]}]</span>
                                                        <span className={cn(
                                                            log.includes('Error') ? "text-red-400" :
                                                                log.includes('complete') ? "text-green-400" :
                                                                    "text-neutral-300"
                                                        )}>{log.split(']')[1]}</span>
                                                    </div>
                                                ))}
                                                <div ref={logsEndRef} />
                                            </div>
                                        )}

                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            active ? "border-purple-500 text-white" : "border-transparent text-neutral-400 hover:text-neutral-200"
        )}
    >
        <Icon size={14} /> {label}
    </button>
)

const BuildStep = ({ icon: Icon, text, status }: { icon: any, text: string, status: 'pending' | 'active' | 'completed' }) => {
    return (
        <div className={cn(
            "flex items-center gap-4 transition-all duration-300",
            status === 'pending' ? "opacity-30 blur-[1px]" : "opacity-100"
        )}>
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300",
                status === 'completed' ? "bg-green-500/20 border-green-500/50 text-green-400" :
                    status === 'active' ? "bg-purple-500/20 border-purple-500/50 text-purple-400 animate-pulse" :
                        "bg-white/5 border-white/10 text-neutral-500"
            )}>
                {status === 'completed' ? <CheckCircle2 size={18} /> : <Icon size={18} />}
            </div>
            <div>
                <p className={cn(
                    "font-medium",
                    status === 'active' ? "text-white" : "text-neutral-400"
                )}>{text}</p>
                {status === 'active' && <p className="text-xs text-purple-400 mt-1">Processing...</p>}
            </div>
        </div>
    )
}

export default AgentBuilder;