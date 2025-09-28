import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ExternalLink, X } from 'lucide-react';

const SocialPreview = ({ isOpen, onClose, platform, profileData }) => {
  if (!isOpen) return null;

  const getPlatformInfo = () => {
    switch (platform) {
      case 'github':
        return {
          icon: Github,
          name: 'GitHub',
          color: 'from-gray-800 to-gray-900',
          url: 'https://github.com/Dharaanishan-3105',
          description: 'Check out my code repositories and contributions'
        };
      case 'linkedin':
        return {
          icon: Linkedin,
          name: 'LinkedIn',
          color: 'from-blue-600 to-blue-800',
          url: 'https://linkedin.com/in/dharaanishan-s',
          description: 'Connect with me professionally on LinkedIn'
        };
      default:
        return null;
    }
  };

  const platformInfo = getPlatformInfo();
  if (!platformInfo) return null;

  const Icon = platformInfo.icon;

  const handleVisitProfile = () => {
    window.open(platformInfo.url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${platformInfo.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{platformInfo.name}</h3>
                <p className="text-sm text-gray-400">Profile Preview</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Profile Preview */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DS</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Dharaanishan S</h4>
                  <p className="text-gray-400 text-sm">Data Analyst & AI Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {platformInfo.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>📍 Trichy, India</span>
                <span>•</span>
                <span>🎓 B.Tech Student</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleVisitProfile}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Profile
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SocialPreview;
